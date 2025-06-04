using App.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using Domain.Models.DTOs.Category;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.BudgetGroup;

public class GetAllBudgetGroups
{
    public class Query : IRequest<Result<List<CategoryGroupDto>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<CategoryGroupDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Access the db to get items
        public async Task<Result<List<CategoryGroupDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            List<CategoryGroupDto> categoryGroups =
                await _context.BudgetGroups.Include(c => c.Categories)
                    .ProjectTo<CategoryGroupDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken: cancellationToken);

            return Result<List<CategoryGroupDto>>.Success(categoryGroups);
        }
    }
}