using App.Mediatr.Transactions;
using Domain.Models.Accounts;
using Domain.Models.Transactions;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Transactions;

public class TransactionController : BaseApiController
{
    /// <summary>
    /// Gets all <see cref="Transaction"/>s for an <see cref="Account"/>
    /// </summary>
    /// <param name="id">the <see cref="Account.Id"/> of the account to add transaction</param>
    /// <returns>A list of all transactions per account</returns>
    [HttpGet("account/{id}")]
    public async Task<IActionResult> GetAllAccountTransactions(Guid id)
    {
        // return HandleResults(await Mediator.Send(new DeleteAccount.Command { Id = id }));
        return HandleResults(await Mediator.Send(new GetTransaction.Query { Id = id }));
    }

    /// <summary>
    /// Gets a <see cref="Transaction"/> by its <see cref="Transaction.Id"/>
    /// </summary>
    /// <param name="id">the <see cref="Transaction.Id"/></param>
    /// <returns>A single transaction</returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTransaction(Guid id)
    {
        return HandleResults(await Mediator.Send(new GetTransaction.Query { Id = id }));
    }

    /// <summary>
    /// Deletes a <see cref="Transaction"/> by its <see cref="Transaction.Id"/>
    /// </summary>
    /// <param name="id">The <see cref="Transaction.Id"/></param>
    /// <returns>nothin</returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTransaction(Guid id)
    {
        return HandleResults(await Mediator.Send(new DeleteTransaction.Command { Id = id }));
    }

    /// <summary>
    /// Updates a <see cref="Transaction"/>
    /// </summary>
    /// <param name="transaction">The <see cref="Transaction"/> to update</param>
    /// <returns>notta</returns>
    [HttpPut]
    public async Task<IActionResult> UpdateTransaction(Transaction transaction)
    {
        return HandleResults(await Mediator.Send(new UpdateTransaction.Command
        {
            Transaction = transaction
        }));
    }

    [HttpPost("{id}")]
    public async Task<IActionResult> CreateTransaction(Guid id, Transaction transaction)
    {
        return HandleResults(await Mediator.Send(new CreateTransaction.Command
        {
            Id = id,
            Transaction = transaction
        }));
    }
}