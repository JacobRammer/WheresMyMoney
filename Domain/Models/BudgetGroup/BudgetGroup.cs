namespace Domain.Models.BudgetGroup;

/// <summary>
/// A group of budget items
/// </summary>
public class BudgetGroup
{
    public Guid Id { get; set; }

    public required string Name { get; set; }
}