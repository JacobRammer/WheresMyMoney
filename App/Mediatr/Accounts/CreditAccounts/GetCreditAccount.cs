using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.CreditAccounts
{
    public class GetCreditAccount
    {
        public class Query : IRequest<Result<CreditAccount>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<CreditAccount>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context)
            {
                _context = context;
            }
        
            // Access the db to get items
            public async Task<Result<CreditAccount>> Handle(Query request, CancellationToken cancellationToken)
            {
                CreditAccount account = await _context.CreditAccounts.FirstOrDefaultAsync(a => a.Id == request.Id);

                return Result<CreditAccount>.Success(account);
            }
        }
    }
}