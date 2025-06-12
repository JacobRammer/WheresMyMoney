using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using App.Core;
using DataAccess;
using Domain.Enums.Transactions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Payees
{
/// <summary>
/// Handles deleting a <see cref="Payee"/>
/// </summary>
    public class DeletePayee
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid IdOfPayeeToDelete { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) => _context = context;

            // save changes to the db
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Payee payee = await _context.Payees.FirstOrDefaultAsync(p => p.Id == request.IdOfPayeeToDelete, cancellationToken: cancellationToken);

                if (payee == null)
                    return Result<Unit>.Failure("Failed to find Payee. No action taken");

                _context.Remove(payee);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}