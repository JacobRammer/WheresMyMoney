using App.Core;
using AutoMapper;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.Category;

public class UpdateCategory
{
    public class Command : IRequest<Result<Unit>>
    {
        public Domain.Models.Category.Category UpdatedCategory { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            Domain.Models.Category.Category categoryToUpdate = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == request.UpdatedCategory.Id, 
                cancellationToken: cancellationToken);

            if (categoryToUpdate != null)
                _mapper.Map(request.UpdatedCategory, categoryToUpdate);
            
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }

}