using App.Core;
using AutoMapper;
using DataAccess;
using Domain.Models.Accounts;
using MediatR;

namespace App.Mediatr.Accounts.CashAccounts
{
    public class CreateAccount
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Account TheAccount { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }

            // save changes to the db
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Accounts.Add(request.TheAccount);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}