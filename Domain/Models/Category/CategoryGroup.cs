namespace Domain.Models.Category;

public class CategoryGroup
{
    /// <summary>
    /// The <see cref="CategoryGroup.Id"/> of this <see cref="CategoryGroup"/>
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// The title of this <see cref="CategoryGroup"/>
    /// </summary>
    public required string Title { get; set; }

    /// <summary>
    /// The list of <see cref="Category"/> in this <see cref="CategoryGroup"/>
    /// </summary>
    public ICollection<Category> Categories { get; set; } = new List<Category>();

    /// <summary>
    /// Adds a <see cref="Category"/> to the <see cref="Categories"/> list
    /// </summary>
    /// <param name="category"></param>
    public void AddCategory(Category category)
    {
        Categories.Add(category);
    }
}