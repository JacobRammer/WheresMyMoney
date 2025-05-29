using App.Core;
using AutoMapper;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.BudgetGroup;

public class EditBudgetGroup
{
    public class Command : IRequest<Result<Unit>>
    {
        public Domain.Models.Budgets.BudgetGroup UpdatedBudgetGroup { get; set; }
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
            Domain.Models.Budgets.BudgetGroup budgetGroupToUpdate = await _context.CategoryGroups.FirstOrDefaultAsync(
                c => c.Id == request.UpdatedBudgetGroup.Id, cancellationToken: cancellationToken);
            
            if (budgetGroupToUpdate != null)
                _mapper.Map(request.UpdatedBudgetGroup, budgetGroupToUpdate);
            
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }

}