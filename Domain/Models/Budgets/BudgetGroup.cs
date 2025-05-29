namespace Domain.Models.Budgets;

public class BudgetGroup
{
    /// <summary>
    /// The <see cref="BudgetGroup.Id"/> of this <see cref="BudgetGroup"/>
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// The title of this <see cref="BudgetGroup"/>
    /// </summary>
    public required string Title { get; set; }

    /// <summary>
    /// The list of <see cref="Budget"/> in this <see cref="BudgetGroup"/>
    /// </summary>
    public ICollection<Budget> Categories { get; set; } = new List<Budget>();

    /// <summary>
    /// Adds a <see cref="Budget"/> to the <see cref="Categories"/> list
    /// </summary>
    /// <param name="budget"></param>
    public void AddCategory(Budget budget)
    {
        Categories.Add(budget);
    }
}