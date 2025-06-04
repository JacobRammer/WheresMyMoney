using App.Core;
using DataAccess;
using MediatR;

namespace App.Mediatr.Budget.BudgetGroup;

public class CreateBudgetGroup
{
    public class Command : IRequest<Result<Unit>>
    {
        public Domain.Models.Budgets.BudgetGroup BudgetGrouop { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            await _context.AddAsync(request.BudgetGrouop, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}