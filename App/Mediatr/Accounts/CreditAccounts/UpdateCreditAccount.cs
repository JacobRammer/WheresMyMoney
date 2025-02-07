using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.CreditAccounts;

/// <summary>
/// Updates a <see cref="CashAccount"/>
/// </summary>
public class UpdateCreditAccount
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            CreditAccount account = await _context.CreditAccounts.FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken: cancellationToken);
            
            if (account != null)
                account.Name = request.Name;
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }

}