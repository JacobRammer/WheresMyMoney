using App.Core;
using AutoMapper;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.CashAccounts;

/// <summary>
/// Updates a <see cref="Account"/>
/// </summary>
public class UpdateAccount
{
    public class Command : IRequest<Result<Unit>>
    {
        public Account TheAccount { get; set; }
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
            Account account = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == request.TheAccount.Id,
                cancellationToken: cancellationToken);

            if (account != null)
            {
                _mapper.Map(request.TheAccount, account);
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}