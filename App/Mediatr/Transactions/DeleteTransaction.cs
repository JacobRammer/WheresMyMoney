using App.Core;
using DataAccess;
using Domain.Models.Transactions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Transactions;

/// <summary>
/// Deletes a <see cref="Transaction"/>
/// </summary>
public class DeleteTransaction
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
            Transaction transaction =
                await _context.Transactions.FirstOrDefaultAsync(t => t.Id == request.Id,
                    cancellationToken: cancellationToken);
            _context.Remove(transaction);
            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}