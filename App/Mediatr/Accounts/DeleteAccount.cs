using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts;

public class DeleteAccount
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            CashAccount account = await _context.CashAccounts.FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);
            
            if (account != null)
                _context.Remove(account);
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }

    }
}