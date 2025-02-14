using App.Mediatr.Accounts;
using App.Mediatr.Accounts.CashAccounts;
using Domain.Enums;
using Domain.Models.Accounts;
using Domain.Models.DTOs;
using Domain.Models.DTOs.Accounts;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Accounts
{
    public class CashAccountController
        
        : BaseApiController
    {
        /// <summary>
        /// Creates a new account
        /// </summary>
        /// <param name="cashAccount">the <see cref="CashAccount"/> to create</param>
        /// <returns>Nothing</returns>
        [HttpPost]
        public async Task<IActionResult> CreateAccount(CashAccountDto cashAccount)
        {
            return HandleResults(await Mediator.Send(new CreateCashAccount.Command 
                { CashAccount = cashAccount}));
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            return HandleResults(await Mediator.Send(new DeleteCashAccount.Command {Id = id}));
        }

        /// <summary>
        /// Updates a <see cref="Domain.Models.Accounts.CashAccount"/>
        /// </summary>
        /// <param name="id">the <see cref="Domain.Models.Accounts.CashAccount.Id"/></param>
        /// <param name="cashAccount">the <see cref="CashAccountDto"/> containing updated information</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(Guid id, CashAccountDto cashAccount)
        {
            return HandleResults(await Mediator.Send(new UpdateCashAccount.Command
            {
                Id = id, 
                CashAccountDto = cashAccount
                
            }));
        }
    }
}