using App.Core;
using DataAccess;
using Domain.Enums;
using Domain.Models.Accounts;
using MediatR;

namespace App.Mediatr.Accounts.CreditAccounts
{
    public class CreateCreditAccount
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
                CreditAccount account = new CreditAccount
                {
                    Name = request.Name,
                    Balance = 0,
                    Id = Guid.NewGuid(),
                    AccountType = AccountType.Credit
                };

                _context.CreditAccounts.Add(account);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        
        }
        
    }
}