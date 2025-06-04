using App.Core;
using DataAccess;
using MediatR;

namespace App.Mediatr.Budget.BudgetItem;

public class AddBudgetItem
{
    public class Command : IRequest<Result<Unit>>
    {
        public Domain.Models.Budgets.BudgetItem BudgetToAdd { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            await _context.BudgetItems.AddAsync(request.BudgetToAdd, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}