using App.Mediatr.Accounts;
using App.Mediatr.Accounts.CashAccount;
using App.Mediatr.Accounts.CashAccounts;
using Domain.Enums;
using Domain.Models.Accounts;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Accounts
{
    public class CashAccountController
        
        : BaseApiController
    {
        /// <summary>
        /// Creates a new account
        /// </summary>
        /// <param name="name">the <see cref="Domain.Models.Accounts.CashAccount.Name"/> of the account</param>
        /// <returns>Nothing</returns>
        [HttpPost]
        public async Task<IActionResult> CreateAccount(string name)
        {
            return HandleResults(await Mediator.Send(new CreateCashAccount.Command 
                { Name = name}));
        }

        /// <summary>
        /// Gets an <see cref="Domain.Models.Accounts.CashAccount"/> by its <see cref="Domain.Models.Accounts.CashAccount.Id"/>
        /// </summary>
        /// <param name="id">the <see cref="Domain.Models.Accounts.CashAccount.Id"/></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccount(Guid id)
        {
            return HandleResults(await Mediator.Send(new GetCashAccount.Query { Id = id }));
        }

        /// <summary>
        /// Gets all accounts
        /// </summary>
        /// <returns>a list of all accounts</returns>
        [HttpGet]
        public async Task<IActionResult> GetAccounts()
        {
            return HandleResults(await Mediator.Send(new GetAllCashAccounts.Query()));
        }

        /// <summary>
        /// Deletes a <see cref="Domain.Models.Accounts.CashAccount"/> by the <see cref="Domain.Models.Accounts.CashAccount.Id"/>
        /// </summary>
        /// <param name="id">the <see cref="Domain.Models.Accounts.CashAccount.Id"/></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            return HandleResults(await Mediator.Send(new DeleteCashAccount.Command {Id = id}));
        }

        /// <summary>
        /// Updates a <see cref="Domain.Models.Accounts.CashAccount"/>
        /// </summary>
        /// <param name="id">the <see cref="Domain.Models.Accounts.CashAccount.Id"/></param>
        /// <param name="name">Updated name</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(Guid id, string name)
        {
            return HandleResults(await Mediator.Send(new UpdateCashAccount.Command { Id = id, Name = name }));
        }
    }
}