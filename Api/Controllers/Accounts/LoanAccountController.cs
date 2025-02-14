using App.Mediatr.Accounts.CreditAccounts;
using App.Mediatr.Accounts.LoanAccounts;
using Domain.Models.Accounts;
using Domain.Models.DTOs.Accounts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Accounts;

public class LoanAccountController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> CreateAccount(LoanAccountDto loanAccount)
    {
        return HandleResults(await Mediator.Send(new CreateLoanAccount.Command
        {
            LoanAccount = loanAccount
        }));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAccount(Guid id)
    {
        return HandleResults(await Mediator.Send(new GetLoanAccount.Query { Id = id }));
    }

    [HttpGet]
    public async Task<IActionResult> GetAccounts()
    {
        return HandleResults(await Mediator.Send(new GetAllLoanAccounts.Query()));
    }
        
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAccount(Guid id)
    {
        return HandleResults(await Mediator.Send(new DeleteLoanAccount.Command {Id = id}));
    }
        
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAccount(Guid id, LoanAccountDto loanAccount)
    {
        return HandleResults(await Mediator.Send(new UpdateLoanAccount.Command { Id = id, LoanAccount = loanAccount }));
    }
}