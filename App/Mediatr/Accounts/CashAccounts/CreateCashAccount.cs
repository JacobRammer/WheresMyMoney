using App.Core;
using DataAccess;
using Domain.Enums;
using Domain.Models.Accounts;
using Domain.Models.DTOs;
using Domain.Models.DTOs.Accounts;
using MediatR;

namespace App.Mediatr.Accounts.CashAccounts
{
    public class CreateCashAccount
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CashAccountDto CashAccount { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
        
            public Handler(DataContext context) => _context = context;
        
            // save changes to the db
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                CashAccount account = new CashAccount
                {
                    Name = request.CashAccount.Name,
                    Balance = request.CashAccount.Balance,
                    Id = Guid.NewGuid(),
                    AccountType = request.CashAccount.AccountType,
                    Description = request.CashAccount.Desctiption,
                };

                _context.CashAccounts.Add(account);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        
        }
        
    }
}