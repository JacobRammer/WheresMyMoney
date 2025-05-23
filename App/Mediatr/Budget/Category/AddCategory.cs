using App.Core;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.Category;

public class AddCategory
{
    public class Command : IRequest<Result<Unit>>
    {
        public Domain.Models.Category.Category CategoryToAdd { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            
            await _context.Categories.AddAsync(request.CategoryToAdd, cancellationToken);
            
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }

}