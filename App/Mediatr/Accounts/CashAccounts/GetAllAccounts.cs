using App.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using Domain.Models.DTOs.Accounts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace App.Mediatr.Accounts.CashAccounts;

public class GetAllAccounts
{
    public class Query : IRequest<Result<List<AccountDto>>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<List<AccountDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Access the db to get items
        public async Task<Result<List<AccountDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            List<AccountDto> accounts = await _context.Accounts
                .ProjectTo<AccountDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken: cancellationToken);
            return Result<List<AccountDto>>.Success(accounts);
        }
    }
}