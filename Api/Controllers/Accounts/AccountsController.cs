using App.Mediatr.Accounts;
using Domain.Enums;
using Domain.Models.Accounts;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Accounts
{
    public class AccountsController : BaseApiController
    {
        /// <summary>
        /// Creates a new account
        /// </summary>
        /// <param name="name">the <see cref="CashAccount.Name"/> of the account</param>
        /// <returns>Nothing</returns>
        [HttpPost]
        public async Task<IActionResult> CreateAccount(string name)
        {
            return HandleResults(await Mediator.Send(new CreateAccount.Command 
                { Name = name, Type = AccountType.CashAccount}));
        }

        /// <summary>
        /// Gets an <see cref="CashAccount"/> by its <see cref="CashAccount.Id"/>
        /// </summary>
        /// <param name="id">the <see cref="CashAccount.Id"/></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccount(Guid id)
        {
            return HandleResults(await Mediator.Send(new GetAccount.Query { Id = id }));
        }

        /// <summary>
        /// Gets all accounts
        /// </summary>
        /// <returns>a list of all accounts</returns>
        [HttpGet]
        public async Task<IActionResult> GetAccounts()
        {
            return HandleResults(await Mediator.Send(new GetAllAccounts.Query()));
        }

        /// <summary>
        /// Deletes a <see cref="CashAccount"/> by the <see cref="CashAccount.Id"/>
        /// </summary>
        /// <param name="id">the <see cref="CashAccount.Id"/></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            return HandleResults(await Mediator.Send(new DeleteAccount.Command {Id = id}));
        }

        /// <summary>
        /// Updates a <see cref="CashAccount"/>
        /// </summary>
        /// <param name="id">the <see cref="CashAccount.Id"/></param>
        /// <param name="name">Updated name</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(Guid id, string name)
        {
            return HandleResults(await Mediator.Send(new UpdateAccount.Command { Id = id, Name = name }));
        }
    }
}