using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using Domain.Models.DTOs;
using Domain.Models.DTOs.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.CashAccounts;

/// <summary>
/// Updates a <see cref="CashAccount"/>
/// </summary>
public class UpdateCashAccount
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }

        public CashAccountDto CashAccountDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            CashAccount account = await _context.CashAccounts.FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken: cancellationToken);
            
            if (account != null)
            {
                account.Name = request.CashAccountDto.Name;
                account.AccountType = request.CashAccountDto.AccountType;
                account.Balance = request.CashAccountDto.Balance;
                account.Description = request.CashAccountDto.Description;
            }
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }

}