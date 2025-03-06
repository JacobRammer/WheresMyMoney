using App.Core;
using DataAccess;
using Domain.Models.Transactions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Transactions;

/// <summary>
/// Gets a <see cref="Transaction"/> by its <see cref="Transaction.Id"/>
/// </summary>
public class GetTransaction
{
    public class Query : IRequest<Result<Transaction>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Transaction>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<Transaction>> Handle(Query request, CancellationToken cancellationToken)
        {
            Transaction transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken: cancellationToken);

            return Result<Transaction>.Success(transaction);
        }
    }
}