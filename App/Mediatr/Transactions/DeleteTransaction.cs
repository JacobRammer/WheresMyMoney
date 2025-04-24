using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using Domain.Models.Transactions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Transactions;

/// <summary>
/// Deletes a <see cref="Transaction"/>
/// </summary>
public class DeleteTransaction
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            Transaction transaction =
                await _context.Transactions.FirstOrDefaultAsync(t => t.Id == request.Id,
                    cancellationToken: cancellationToken);

            if (transaction == null)
                return Result<Unit>.Failure($"Could not find transaction by id {request.Id}");

            _context.Remove(transaction);

            // Update the account balance
            Account account =
                await _context.Accounts.FirstOrDefaultAsync(a => a.Id == transaction.AccountId, cancellationToken);

            if (transaction.Amount < 0)
                account.Balance += Math.Abs(transaction.Amount);
            else
                account.Balance -= Math.Abs(transaction.Amount);

            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}