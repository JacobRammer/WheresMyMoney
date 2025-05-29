using App.Core;
using DataAccess;
using Domain.Models.Budgets;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.BudgetItem;

public class GetAllBudgetItems
{
    public class Query : IRequest<Result<List<Domain.Models.Budgets.Budget>>>
    {
        /// <summary>
        /// The <see cref="BudgetGroup.Id"/> of the parent of this
        /// category
        /// </summary>
        public Guid CategoryGroupId { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<Domain.Models.Budgets.Budget>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<List<Domain.Models.Budgets.Budget>>> Handle(Query request, CancellationToken cancellationToken)
        {
            List<Domain.Models.Budgets.Budget> categories = await _context.Categories
                .Where(c => c.CategoryGroupId == request.CategoryGroupId)
                .ToListAsync(cancellationToken: cancellationToken);
            
            return Result<List<Domain.Models.Budgets.Budget>>.Success(categories);
        }
    }
}