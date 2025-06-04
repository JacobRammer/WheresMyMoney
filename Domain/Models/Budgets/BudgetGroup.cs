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
    /// The list of <see cref="BudgetItem"/> in this <see cref="BudgetGroup"/>
    /// </summary>
    public ICollection<BudgetItem> Categories { get; set; } = new List<BudgetItem>();

    /// <summary>
    /// The date this <see cref="BudgetGroup"/> was created
    /// </summary>
    public DateTime DateCreated { get; set; }

    /// <summary>
    /// Adds a <see cref="BudgetItem"/> to the <see cref="Categories"/> list
    /// </summary>
    /// <param name="budget"></param>
    public void AddCategory(BudgetItem budget)
    {
        Categories.Add(budget);
    }
}