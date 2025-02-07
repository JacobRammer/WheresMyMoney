using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.CreditAccounts;

public class GetAllCreditAccounts
{
    public class Query : IRequest<Result<List<CreditAccount>>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<List<CreditAccount>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<List<CreditAccount>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var accounts = await _context.CreditAccounts.ToListAsync(cancellationToken: cancellationToken);
            return Result<List<CreditAccount>>.Success(accounts);
        }
    }
}