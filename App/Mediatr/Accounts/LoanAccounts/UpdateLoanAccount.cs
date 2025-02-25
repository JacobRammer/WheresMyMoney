using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using Domain.Models.DTOs.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.LoanAccounts;

/// <summary>
/// Updates a <see cref="CashAccount"/>
/// </summary>
public class UpdateLoanAccount
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }

        public LoanAccountDto LoanAccount { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            LoanAccount account = await _context.LoanAccounts.FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken: cancellationToken);

            if (account != null)
            {
                account.Name = request.LoanAccount.Name;
                account.Balance = request.LoanAccount.Balance;
                account.InterestRate = request.LoanAccount.InterestRate;
                account.MonthlyPayment = request.LoanAccount.MonthlyPayment;
                account.Description = request.LoanAccount.Description;
            }
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }

}