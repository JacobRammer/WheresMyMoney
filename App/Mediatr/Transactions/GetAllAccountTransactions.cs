using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using Domain.Models.Transactions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Transactions;

/// <summary>
/// Gets all <see cref="Transaction"/>s by the <see cref="Account.Id"/>
/// </summary>
public class GetAllAccountTransactions
{
    public class Query : IRequest<Result<List<Transaction>>>
    {
        public Guid AccountId { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<Transaction>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<List<Transaction>>> Handle(Query request, CancellationToken cancellationToken)
        {
            List<Transaction> transactions =
                await _context.Transactions.Where(t => t.AccountId == request.AccountId)
                    .ToListAsync(cancellationToken: cancellationToken);

            return Result<List<Transaction>>.Success(transactions);
        }
    }
}