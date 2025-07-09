using App.Mediatr.Budget.BudgetItem;
using Domain.Models.Budgets;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Budget.Category;

public class BudgetItemController : BaseApiController
{
    /// <summary>
    /// Gets all categories for a <see cref="BudgetGroup"/> based on
    /// the <see cref="BudgetGroup.Id"/>
    /// </summary>
    /// <param name="categoryGroupId">The id of the <see cref="BudgetGroup"/></param>
    /// <returns>List of categories</returns>
    [HttpGet("{categoryGroupId}")]
    public async Task<IActionResult> GetAllCategories(Guid categoryGroupId)
    {
        return HandleResults(await Mediator.Send(new GetAllBudgetItems.Query { CategoryGroupId = categoryGroupId }));
    }

    /// <summary>
    /// Deletes a <see cref="BudgetItem"/> by its <see cref="BudgetItem.Id"/>
    /// </summary>
    /// <param name="id">The id of the <see cref="BudgetItem"/> to delete</param>
    /// <returns>Nothing</returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        return HandleResults(await Mediator.Send(new DeleteBudgetItem.Command { Id = id }));
    }

    /// <summary>
    /// Updates a <see cref="BudgetItem"/>
    /// </summary>
    /// <param name="budget">The updated category</param>
    /// <returns>Nothing</returns>
    [HttpPut]
    public async Task<IActionResult> UpdateCategory(BudgetItem budget)
    {
        return HandleResults(await Mediator.Send(new UpdateBudgetItem.Command { UpdatedBudget = budget }));
    }

    /// <summary>
    /// Adds a new <see cref="BudgetItem"/> to the <see cref="BudgetItem"/>'s
    /// <see cref="BudgetItem.CategoryGroupId"/>
    /// </summary>
    /// <param name="budget">The <see cref="Budget"/> to add</param>
    /// <returns>Nothing</returns>
    [HttpPost]
    public async Task<IActionResult> AddCategory(BudgetItem budget)
    {
        return HandleResults(await Mediator.Send(new AddBudgetItem.Command
        {
            BudgetToAdd = budget
        }));
    }

    [HttpPost]
    public async Task<IActionResult> UpdateAssigned(AssignedTransaction assignedTransaction)
    {
        return HandleResults(await Mediator.Send(new AddAssignedTransaction.Command
        {
            AssignedTransaction = assignedTransaction
        }));
    }
}