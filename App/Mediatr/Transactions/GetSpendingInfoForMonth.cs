using App.Core;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Transactions;

public class GetSpendingInfoForMonth
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
            double spending = await _context.Transactions.Where(t => t.Date.Month == request.Month)
                .SumAsync(t => t.Amount, cancellationToken: cancellationToken);

            return Result<double>.Success(spending);
        }
    }
}