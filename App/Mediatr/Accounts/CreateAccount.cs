using App.Core;
using DataAccess;
using Domain.Enums;
using Domain.Models.Accounts;
using MediatR;

namespace App.Mediatr.Accounts
{
    public class CreateAccount
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Name { get; set; }
            public AccountType Type { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context) => _context = context;
        
            // save changes to the db
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Type == AccountType.CashAccount)
                {
                    CashAccount account = new CashAccount
                    {
                        Name = request.Name,
                        Balance = 0,
                        Id = Guid.NewGuid()
                    };

                    _context.CashAccounts.Add(account);
                }
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        
        }
        
    }
}