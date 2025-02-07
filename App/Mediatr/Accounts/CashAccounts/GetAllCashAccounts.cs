using App.Core;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.CashAccounts;

public class GetAllCashAccounts
{
    public class Query : IRequest<Result<List<Domain.Models.Accounts.CashAccount>>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<List<Domain.Models.Accounts.CashAccount>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<List<Domain.Models.Accounts.CashAccount>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var accounts = await _context.CashAccounts.ToListAsync(cancellationToken: cancellationToken);
            return Result<List<Domain.Models.Accounts.CashAccount>>.Success(accounts);
        }
    }
}