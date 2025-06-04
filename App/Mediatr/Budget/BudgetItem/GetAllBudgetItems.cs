using App.Core;
using DataAccess;
using Domain.Models.Budgets;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.BudgetItem;

public class GetAllBudgetItems
{
    public class Query : IRequest<Result<List<Domain.Models.Budgets.BudgetItem>>>
    {
        /// <summary>
        /// The <see cref="BudgetGroup.Id"/> of the parent of this
        /// category
        /// </summary>
        public Guid CategoryGroupId { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<Domain.Models.Budgets.BudgetItem>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<List<Domain.Models.Budgets.BudgetItem>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            List<Domain.Models.Budgets.BudgetItem> categories = await _context.BudgetItems
                .Where(c => c.BudgetGroupId == request.CategoryGroupId)
                .ToListAsync(cancellationToken: cancellationToken);

            return Result<List<Domain.Models.Budgets.BudgetItem>>.Success(categories);
        }
    }
}