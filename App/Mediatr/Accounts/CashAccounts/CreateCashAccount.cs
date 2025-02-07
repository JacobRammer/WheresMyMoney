using App.Core;
using DataAccess;
using Domain.Enums;
using MediatR;

namespace App.Mediatr.Accounts.CashAccount
{
    public class CreateCashAccount
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Name { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context) => _context = context;
        
            // save changes to the db
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Domain.Models.Accounts.CashAccount account = new Domain.Models.Accounts.CashAccount
                {
                    Name = request.Name,
                    Balance = 0,
                    Id = Guid.NewGuid(),
                    AccountType = AccountType.Checking
                };

                _context.CashAccounts.Add(account);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        
        }
        
    }
}