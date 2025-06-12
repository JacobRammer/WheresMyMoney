using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Core;
using DataAccess;
using Domain.Enums.Transactions;
using MediatR;

namespace App.Mediatr.Payees
{
/// <summary>
/// Handles creating an <see cref="Payee"/>
/// </summary>
    public class CreatePayee
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Payee PayeeToCreate { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) => _context = context;

            // save changes to the db
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                await _context.Payees.AddAsync(request.PayeeToCreate, cancellationToken: cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}