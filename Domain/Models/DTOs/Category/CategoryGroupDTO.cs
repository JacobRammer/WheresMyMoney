using Domain.Models.Budgets;

namespace Domain.Models.DTOs.Category;

public class CategoryGroupDto
{
    /// <summary>
    /// The <see cref="BudgetGroup.Id"/> of this <see cref="BudgetGroup"/>
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// The title of this <see cref="BudgetGroup"/>
    /// </summary>
    public required string Title { get; set; }

    public double Assigned => this.Categories.Sum(x => x.Assigned);

    public double Outflow => this.Categories.Sum(x => x.Outflow);

    public double Available => Assigned - Outflow;

    /// <summary>
    /// The list of <see cref="Category"/> in this <see cref="BudgetGroup"/>
    /// </summary>
    public ICollection<BudgetItem> Categories { get; set; } = new List<BudgetItem>();

    /// <summary>
    /// The date this <see cref="BudgetGroup"/> was created
    /// </summary>
    public DateTime DateCreated { get; set; }
}