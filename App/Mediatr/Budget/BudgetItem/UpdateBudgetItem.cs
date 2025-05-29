using App.Core;
using AutoMapper;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Budget.BudgetItem;

public class UpdateBudgetItem
{
    public class Command : IRequest<Result<Unit>>
    {
        public Domain.Models.Budgets.Budget UpdatedBudget { get; set; }
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
            Domain.Models.Budgets.Budget budgetToUpdate = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == request.UpdatedBudget.Id, 
                cancellationToken: cancellationToken);

            if (budgetToUpdate != null)
                _mapper.Map(request.UpdatedBudget, budgetToUpdate);
            
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }

}