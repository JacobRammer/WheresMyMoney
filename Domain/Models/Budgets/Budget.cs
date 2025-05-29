using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Budgets;

/// <summary>
/// Represents a category. This is an individual budget item
/// such as I want to save 200 a bucks a month, or have
/// a budget of $600 a month for groceries.
/// </summary>
public class Budget
{
    /// <summary>
    /// The <see cref="Budget.Id"/>
    /// </summary>
    [Required]
    public Guid Id { get; set; }

    /// <summary>
    /// The <see cref="Budget.Title"/>
    /// </summary>
    public required string Title { get; set; }

    /// <summary>
    /// How much to assign to this <see cref="Budget"/>
    /// </summary>
    public double Target { get; set; }

    /// <summary>
    /// How much has been spent on this <see cref="Budget"/>
    /// </summary>
    public double Outflow { get; set; }

    /// <summary>
    /// How much has been assigned to this <see cref="Budget"/>
    /// </summary>
    public double Assigned { get; set; }

    /// <summary>
    /// the <see cref="BudgetGroup.Id"/> of this <see cref="Budget"/>
    /// </summary>
    public Guid CategoryGroupId { get; set; }
}