using App.Core;
using DataAccess;
using Domain.Models.Category;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.Category;

public class GetAllCategories
{
    public class Query : IRequest<Result<List<Domain.Models.Category.Category>>>
    {
        /// <summary>
        /// The <see cref="CategoryGroup.Id"/> of the parent of this
        /// category
        /// </summary>
        public Guid CategoryGroupId { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<Domain.Models.Category.Category>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<List<Domain.Models.Category.Category>>> Handle(Query request, CancellationToken cancellationToken)
        {
            List<Domain.Models.Category.Category> categories = await _context.Categories
                .Where(c => c.CategoryGroupId == request.CategoryGroupId)
                .ToListAsync(cancellationToken: cancellationToken);
            
            return Result<List<Domain.Models.Category.Category>>.Success(categories);
        }
    }
}