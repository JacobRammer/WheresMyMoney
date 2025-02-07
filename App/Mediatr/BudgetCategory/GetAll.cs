using App.Core;
using App.DTOs;
using App.Extensions;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.BudgetCategory;

public class GetAll
{
    public class Query : IRequest<Result<List<BudgetGroupDto>>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<List<BudgetGroupDto>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<List<BudgetGroupDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var budgetGroup = await _context.Groups.ToListAsync(cancellationToken: cancellationToken);

            List<BudgetGroupDto> dtos = new();

            budgetGroup.ForEach(b => dtos.Add(b.ToDto()));
            
            return Result<List<BudgetGroupDto>>.Success(dtos);
        }
    }
}