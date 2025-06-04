using App.Core;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.BudgetGroup;

public class DeleteBudgetGroup
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
            Domain.Models.Budgets.BudgetGroup budgetGroupToDelete = await _context.BudgetGroups.FirstOrDefaultAsync(
                c => c.Id == request.Id, cancellationToken: cancellationToken);

            if (budgetGroupToDelete != null)
                _context.Remove(budgetGroupToDelete);

            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}