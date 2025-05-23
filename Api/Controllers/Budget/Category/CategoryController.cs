using App.Mediatr.Budget.Category;
using Domain.Models.Category;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers.Budget.Category;

public class CategoryController : BaseApiController
{
    /// <summary>
    /// Gets all categories for a <see cref="CategoryGroup"/> based on
    /// the <see cref="CategoryGroup.Id"/>
    /// </summary>
    /// <param name="categoryGroupId">The id of the <see cref="CategoryGroup"/></param>
    /// <returns>List of categories</returns>
    [HttpGet("{categoryGroupId}")]
    public async Task<IActionResult> GetAllCategories(Guid categoryGroupId)
    {
        return HandleResults(await Mediator.Send(new GetAllCategories.Query { CategoryGroupId = categoryGroupId }));
    }

    /// <summary>
    /// Deletes a <see cref="Category"/> by its <see cref="Category.Id"/>
    /// </summary>
    /// <param name="id">The id of the <see cref="Category"/> to delete</param>
    /// <returns>Nothing</returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        return HandleResults(await Mediator.Send(new DeleteCategory.Command { Id = id }));
    }

    /// <summary>
    /// Updates a <see cref="Category"/>
    /// </summary>
    /// <param name="category">The updated category</param>
    /// <returns>Nothing</returns>
    [HttpPut]
    public async Task<IActionResult> UpdateCategory(Domain.Models.Category.Category category)
    {
        return HandleResults(await Mediator.Send(new UpdateCategory.Command { UpdatedCategory = category }));
    }

    /// <summary>
    /// Adds a new <see cref="Category"/> to the <see cref="Category"/>'s
    /// <see cref="Category.CategoryGroupId"/>
    /// </summary>
    /// <param name="category">The <see cref="Category"/> to add</param>
    /// <returns>Nothing</returns>
    [HttpPost]
    public async Task<IActionResult> AddCategory(Domain.Models.Category.Category category)
    {
        return HandleResults(await Mediator.Send(new AddCategory.Command
            {
                CategoryToAdd = category
            }));
    }
}