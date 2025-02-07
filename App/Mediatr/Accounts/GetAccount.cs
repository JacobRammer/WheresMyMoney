using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts
{
    public class GetAccount
    {
        public class Query : IRequest<Result<CashAccount>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<CashAccount>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context)
            {
                _context = context;
            }
        
            // Access the db to get items
            public async Task<Result<CashAccount>> Handle(Query request, CancellationToken cancellationToken)
            {
                CashAccount account = await _context.CashAccounts.FirstOrDefaultAsync(a => a.Id == request.Id);

                return Result<CashAccount>.Success(account);
            }
        }
    }
}