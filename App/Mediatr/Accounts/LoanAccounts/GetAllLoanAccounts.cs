using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.LoanAccounts;

public class GetAllLoanAccounts
{
    public class Query : IRequest<Result<List<LoanAccount>>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<List<LoanAccount>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        // Access the db to get items
        public async Task<Result<List<LoanAccount>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var accounts = await _context.LoanAccounts.ToListAsync(cancellationToken: cancellationToken);
            return Result<List<LoanAccount>>.Success(accounts);
        }
    }
}