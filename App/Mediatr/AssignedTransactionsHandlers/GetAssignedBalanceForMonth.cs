using App.Core;
using DataAccess;
using Domain.Models.Budgets;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.AssignedTransactionsHandlers;

public class GetAssignedBalanceForMonth
{
    public class Query : IRequest<Result<double>>
    {
        public int Month { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<double>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<double>> Handle(Query request, CancellationToken cancellationToken)
        {
            List<AssignedTransaction> assignedTransactions =
                await _context.AssignedTransactions.Where(t => t.Date.Month == request.Month)
                    .ToListAsync(cancellationToken: cancellationToken);

            return Result<double>.Success(assignedTransactions.Sum(t => t.Amount));
        }
    }
}