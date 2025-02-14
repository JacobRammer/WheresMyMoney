using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.LoanAccounts
{
    public class GetLoanAccount
    {
        public class Query : IRequest<Result<LoanAccount>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<LoanAccount>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context)
            {
                _context = context;
            }
        
            // Access the db to get items
            public async Task<Result<LoanAccount>> Handle(Query request, CancellationToken cancellationToken)
            {
                LoanAccount account = await _context.LoanAccounts.FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken: cancellationToken);

                return Result<LoanAccount>.Success(account);
            }
        }
    }
}