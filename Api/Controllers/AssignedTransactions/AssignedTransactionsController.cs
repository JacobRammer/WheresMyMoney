using App.Mediatr.AssignedTransactionsHandlers;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.AssignedTransactions;

public class AssignedTransactionsController : BaseApiController
{
    /// <summary>
    /// Gets the total amount assigned for the specified month
    /// </summary>
    /// <param name="month">the month as an integer</param>
    /// <returns>the amount assigned</returns>
    [HttpGet("{month}")]
    public async Task<IActionResult> GetAssignedBalanceForMonth(int month)
    {
        return HandleResults(await Mediator.Send(new GetAssignedBalanceForMonth.Query { Month = month }));
    }
}