using App.Mediatr.Budget.BudgetGroup;
using Domain.Models.Budgets;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Budget.Category;

public class BudgetItemGroupController : BaseApiController
{
    /// <summary>
    /// Gets all <see cref="BudgetGroup"/>s
    /// </summary>
    /// <returns>A list of all <see cref="BudgetGroup"/>s</returns>
    [HttpGet("{month}")]
    public async Task<IActionResult> GetAllCategoryGroups(int month)
    {
        return HandleResults(await Mediator.Send(new GetAllBudgetGroups.Query
        {
            Month = month,
        }));
    }

    /// <summary>
    /// Creates a new <see cref="BudgetGroup"/>
    /// </summary>
    /// <param name="budgetGroup">the <see cref="BudgetGroup"/> to add</param>
    /// <returns>Nothing</returns>
    [HttpPost]
    public async Task<IActionResult> CreateCategoryGroup(BudgetGroup budgetGroup)
    {
        return HandleResults(await Mediator.Send(new CreateBudgetGroup.Command
        {
            BudgetGrouop = budgetGroup
        }));
    }

    /// <summary>
    /// Deletes a <see cref="Budget"/> by its <see cref="Budget.Id"/>
    /// </summary>
    /// <param name="id">The id of the <see cref="Budget"/></param>
    /// <returns>Nothing</returns>
    [HttpDelete]
    public async Task<IActionResult> DeleteCategoryGroup(Guid id)
    {
        return HandleResults(await Mediator.Send(new DeleteBudgetGroup.Command
        {
            Id = id
        }));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategoryGroup(Guid id)
    {
        return HandleResults(await Mediator.Send(new DeleteBudgetGroup.Command
        {
            Id = id
        }));
    }
}