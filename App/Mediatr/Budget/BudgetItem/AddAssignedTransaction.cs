using App.Core;
using DataAccess;
using Domain.Models.Budgets;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.BudgetItem
{
    public class AddAssignedTransaction
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AssignedTransaction AssignedTransaction { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) => _context = context;

            // save changes to the db
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var assignedTransaction = await _context.AssignedTransactions.FirstOrDefaultAsync(
                    t => t.BudgetItemId == request.AssignedTransaction.BudgetItemId,
                    cancellationToken: cancellationToken);

                var account = await _context.Accounts.FirstOrDefaultAsync(
                    a => a.Id == request.AssignedTransaction.PrimaryAccountId, cancellationToken: cancellationToken);

                // If the assigned transaction already exists, update it
                if (assignedTransaction != null)
                {
                    assignedTransaction.Amount += request.AssignedTransaction.Amount;

                    if (account != null)
                        account.Available -= request.AssignedTransaction.Amount;

                    await _context.SaveChangesAsync(cancellationToken);
                    return Result<Unit>.Success(Unit.Value);
                }

                _context.AssignedTransactions.Add(request.AssignedTransaction);

                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}