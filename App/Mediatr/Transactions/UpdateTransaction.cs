using App.Core;
using AutoMapper;
using DataAccess;
using Domain.Models.Accounts;
using Domain.Models.Transactions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Transactions;

/// <summary>
/// Updates a <see cref="Transaction"/>
/// </summary>
public class UpdateTransaction
{
    public class Command : IRequest<Result<Unit>>
    {
        public Transaction Transaction { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // save changes to the db
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            Transaction transaction =
                await _context.Transactions.FirstOrDefaultAsync(t => t.Id == request.Transaction.Id,
                    cancellationToken: cancellationToken);


            if (transaction != null)
            {
                // If the amount of the transaction changes, update the difference between the
                // old and new amount

                if (transaction.Amount != request.Transaction.Amount)
                {
                    Account account =
                        await _context.Accounts.FirstOrDefaultAsync(a => a.Id == transaction.AccountId,
                            cancellationToken);

                    double difference = transaction.Amount - request.Transaction.Amount;

                    if (difference < 0)
                        account.Balance += Math.Abs(difference);
                    else
                        account.Balance -= Math.Abs(difference);
                }

                _mapper.Map(request.Transaction, transaction);

                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }

            return Result<Unit>.NotFound("Not found");
        }
    }
}