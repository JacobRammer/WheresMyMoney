using App.Core;
using DataAccess;
using Domain.Models.Accounts;
using Domain.Models.Transactions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Transactions;

/// <summary>
/// Creates a <see cref="Transaction"/>
/// </summary>
public class CreateTransaction
{
    public class Command : IRequest<Result<Unit>>
    {
        public Transaction Transaction { get; set; }

        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            Account account = await _context.Accounts.Include(t => t.Transactions)
                .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken: cancellationToken);

            request.Transaction.Id = Guid.NewGuid();

            account.AddTransaction(request.Transaction);
            _context.Transactions.Add(request.Transaction);
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}