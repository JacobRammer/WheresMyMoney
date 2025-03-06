using App.Core;
using AutoMapper;
using DataAccess;
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
                _mapper.Map(request.Transaction, transaction);

            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}