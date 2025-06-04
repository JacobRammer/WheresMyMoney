using AutoMapper;
using Domain.Models.Accounts;
using Domain.Models.Budgets;
using Domain.Models.DTOs.Accounts;
using Domain.Models.DTOs.Category;
using Domain.Models.Transactions;

namespace App.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Account, AccountDto>().ReverseMap();
        CreateMap<Account, Account>().ReverseMap();
        CreateMap<Transaction, Transaction>().ReverseMap();
        CreateMap<BudgetItem, BudgetItem>().ReverseMap();
        CreateMap<BudgetGroup, CategoryGroupDto>().ReverseMap();
    }
}