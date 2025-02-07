using App.Core;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.CashAccounts
{
    public class GetCashAccount
    {
        public class Query : IRequest<Result<Domain.Models.Accounts.CashAccount>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<Domain.Models.Accounts.CashAccount>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context)
            {
                _context = context;
            }
        
            // Access the db to get items
            public async Task<Result<Domain.Models.Accounts.CashAccount>> Handle(Query request, CancellationToken cancellationToken)
            {
                Domain.Models.Accounts.CashAccount account = await _context.CashAccounts.FirstOrDefaultAsync(a => a.Id == request.Id);

                return Result<Domain.Models.Accounts.CashAccount>.Success(account);
            }
        }
    }
}