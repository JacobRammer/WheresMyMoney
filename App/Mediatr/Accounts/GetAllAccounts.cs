using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts;

public class GetAllAccounts
{
    public class Query : IRequest<Result<List<CashAccount>>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<List<CashAccount>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<List<CashAccount>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var accounts = await _context.CashAccounts.ToListAsync(cancellationToken: cancellationToken);
            return Result<List<CashAccount>>.Success(accounts);
        }
    }
}