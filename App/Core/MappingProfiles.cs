using AutoMapper;
using Domain.Models.Accounts;
using Domain.Models.DTOs.Accounts;

namespace App.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Account, AccountDto>().ReverseMap();
        CreateMap<Account, Account>().ReverseMap();
    }
}