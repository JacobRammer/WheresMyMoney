using App.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using Domain.Models.DTOs.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.CashAccounts
{
    public class GetAccount
    {
        public class Query : IRequest<Result<AccountDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<AccountDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            // Access the db to get items
            public async Task<Result<AccountDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                AccountDto account = await _context.Accounts
                    .ProjectTo<AccountDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken: cancellationToken);

                return Result<AccountDto>.Success(account);
            }
        }
    }
}