using App.Core;
using DataAccess;
using Domain.Enums;
using Domain.Models.Accounts;
using Domain.Models.DTOs.Accounts;
using MediatR;

namespace App.Mediatr.Accounts.LoanAccounts
{
    public class CreateLoanAccount
    {
        public class Command : IRequest<Result<Unit>>
        {
            public LoanAccount LoanAccount { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context) => _context = context;
        
            // save changes to the db
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.LoanAccount.Balance > 0)
                    request.LoanAccount.Balance *= -1;
                LoanAccount account = new LoanAccount
                {
                    Name = request.LoanAccount.Name,
                    Balance = request.LoanAccount.Balance,
                    Id = request.LoanAccount.Id,
                    AccountType = AccountType.Loan,
                    InterestRate = request.LoanAccount.InterestRate,
                    MonthlyPayment = request.LoanAccount.MonthlyPayment,
                    Description = request.LoanAccount.Description,
                };

                _context.LoanAccounts.Add(account);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        
        }
        
    }
}