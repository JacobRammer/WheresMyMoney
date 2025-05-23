using App.Core;
using DataAccess;
using MediatR;

namespace App.Mediatr.Budget.CategoryGroup;

public class CreateCategoryGroup
{
    public class Command : IRequest<Result<Unit>>
    {
        public Domain.Models.Category.CategoryGroup TheCategoryGroup { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            await _context.AddAsync(request.TheCategoryGroup, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }

}