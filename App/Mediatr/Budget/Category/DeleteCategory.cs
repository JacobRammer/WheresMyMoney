using App.Core;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.Category;

public class DeleteCategory
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
            Domain.Models.Category.Category categoryToRemove = await _context.Categories.FirstOrDefaultAsync(
                c => c.Id == request.Id, cancellationToken: cancellationToken);
            
            _context.Remove(categoryToRemove);
            await _context.SaveChangesAsync(cancellationToken: cancellationToken);
            
            return Result<Unit>.Success(Unit.Value);
        }

    }
}