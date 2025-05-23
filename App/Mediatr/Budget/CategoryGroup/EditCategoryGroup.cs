using App.Core;
using AutoMapper;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.CategoryGroup;

public class EditCategoryGroup
{
    public class Command : IRequest<Result<Unit>>
    {
        public Domain.Models.Category.CategoryGroup UpdatedCategoryGroup { get; set; }
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
            Domain.Models.Category.CategoryGroup categoryGroupToUpdate = await _context.CategoryGroups.FirstOrDefaultAsync(
                c => c.Id == request.UpdatedCategoryGroup.Id, cancellationToken: cancellationToken);
            
            if (categoryGroupToUpdate != null)
                _mapper.Map(request.UpdatedCategoryGroup, categoryGroupToUpdate);
            
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }

}