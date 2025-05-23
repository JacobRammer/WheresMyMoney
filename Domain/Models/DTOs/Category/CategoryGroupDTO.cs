namespace Domain.Models.DTOs.Category;

public class CategoryGroupDto
{
    /// <summary>
    /// The <see cref="Models.Category.CategoryGroup.Id"/> of this <see cref="Models.Category.CategoryGroup"/>
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// The title of this <see cref="Models.Category.CategoryGroup"/>
    /// </summary>
    public required string Title { get; set; }
    
    public double Assigned => this.Categories.Sum(x => x.Assigned);

    public double Outflow => this.Categories.Sum(x => x.Outflow);

    public double Available => Assigned - Outflow;

    /// <summary>
    /// The list of <see cref="Category"/> in this <see cref="Models.Category.CategoryGroup"/>
    /// </summary>
    public ICollection<Models.Category.Category> Categories { get; set; } = new List<Models.Category.Category>();
}