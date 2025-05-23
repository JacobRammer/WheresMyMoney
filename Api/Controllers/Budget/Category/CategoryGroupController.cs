using App.Mediatr.Budget.CategoryGroup;
using Domain.Models.Category;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Budget.Category;

public class CategoryGroupController : BaseApiController
{
    /// <summary>
    /// Gets all <see cref="CategoryGroup"/>s
    /// </summary>
    /// <returns>A list of all <see cref="CategoryGroup"/>s</returns>
    [HttpGet]
    public async Task<IActionResult> GetAllCategoryGroups()
    {
        return HandleResults(await Mediator.Send(new GetAllCategoryGroups.Query()));
    }
    
    /// <summary>
    /// Creates a new <see cref="CategoryGroup"/>
    /// </summary>
    /// <param name="categoryGroup">the <see cref="CategoryGroup"/> to add</param>
    /// <returns>Nothing</returns>
    [HttpPost]
    public async Task<IActionResult> CreateCategoryGroup(CategoryGroup categoryGroup)
    {
        return HandleResults(await Mediator.Send(new CreateCategoryGroup.Command
        {
            TheCategoryGroup = categoryGroup
        }));
    }
    
    /// <summary>
    /// Deletes a <see cref="Category"/> by its <see cref="Category.Id"/>
    /// </summary>
    /// <param name="id">The id of the <see cref="Category"/></param>
    /// <returns>Nothing</returns>
    [HttpDelete]
    public async Task<IActionResult> DeleteCategoryGroup(Guid id)
    {
        return HandleResults(await Mediator.Send(new DeleteCategoryGroup.Command
        {
            Id = id
        }));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategoryGroup(Guid id)
    {
        return HandleResults(await Mediator.Send(new DeleteCategoryGroup.Command
        {
            Id = id
        }));
    }
}