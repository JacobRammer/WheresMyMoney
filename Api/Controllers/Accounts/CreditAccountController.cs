using App.Mediatr.Accounts;
using App.Mediatr.Accounts.CashAccounts;
using App.Mediatr.Accounts.CreditAccounts;
using Domain.Models.DTOs.Accounts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Accounts;

public class CreditAccountController : BaseApiController
{
        [HttpPost]
        public async Task<IActionResult> CreateAccount(CreditAccountDto creditAccount)
        {
            return HandleResults(await Mediator.Send(new CreateCreditAccount.Command { CreditAccountDto = creditAccount}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccount(Guid id)
        {
            return HandleResults(await Mediator.Send(new GetCreditAccount.Query { Id = id }));
        }

        [HttpGet]
        public async Task<IActionResult> GetAccounts()
        {
            return HandleResults(await Mediator.Send(new GetAllCreditAccounts.Query()));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            return HandleResults(await Mediator.Send(new DeleteCreditAccount.Command {Id = id}));
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(Guid id, CreditAccountDto creditAccount)
        {
            return HandleResults(await Mediator.Send(new UpdateCreditAccount.Command { Id = id, CreditAccountDto = creditAccount }));
        }
}