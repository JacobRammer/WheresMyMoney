using App.Mediatr.Accounts.CashAccounts;
using Domain.Models.Accounts;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Accounts
{
    public class AccountController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateAccount(Account account)
        {
            return HandleResults(await Mediator.Send(new CreateAccount.Command
                { TheAccount = account }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccount(Guid id)
        {
            return HandleResults(await Mediator.Send(new GetAccount.Query { Id = id }));
        }

        [HttpGet]
        public async Task<IActionResult> GetAccounts()
        {
            return HandleResults(await Mediator.Send(new GetAllAccounts.Query()));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            return HandleResults(await Mediator.Send(new DeleteAccount.Command { Id = id }));
        }

        [HttpPut()]
        public async Task<IActionResult> UpdateAccount(Account cashAccount)
        {
            return HandleResults(await Mediator.Send(new UpdateAccount.Command
            {
                TheAccount = cashAccount
            }));
        }
    }
}