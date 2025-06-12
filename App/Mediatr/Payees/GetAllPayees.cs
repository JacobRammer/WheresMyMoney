using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Core;
using DataAccess;
using Domain.Enums.Transactions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Payees
{
    public class GetAllPayees
    {
        public class Query : IRequest<Result<List<Payee>>>
        {
        }
        
        public class Handler : IRequestHandler<Query, Result<List<Payee>>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context)
            {
                _context = context;
            }
            // Access the db to get items
            public async Task<Result<List<Payee>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Payee>>.Success(await _context.Payees.ToListAsync(cancellationToken: cancellationToken));
            }
        }
    }
}