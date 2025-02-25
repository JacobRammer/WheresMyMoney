using App.Core;
using DataAccess;
using Domain.Enums;
using Domain.Models.Accounts;
using Domain.Models.DTOs.Accounts;
using MediatR;


namespace App.Mediatr.Accounts.CreditAccounts
{
    public class CreateCreditAccount
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CreditAccount CreditAccount { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context) => _context = context;
        
            // save changes to the db
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.CreditAccount.Balance > 0)
                {
                    request.CreditAccount.Balance *= -1;
                }
                CreditAccount account = new CreditAccount
                {
                    Name = request.CreditAccount.Name,
                    Balance = request.CreditAccount.Balance,
                    Id = request.CreditAccount.Id,
                    AccountType = AccountType.Credit,
                    Description = request.CreditAccount.Description,
                    InterestRate = request.CreditAccount.InterestRate,
                    MonthlyPayment = request.CreditAccount.MonthlyPayment,
                };

                _context.CreditAccounts.Add(account);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        
        }
        
    }
}