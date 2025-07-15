using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.Budgets;

/// <summary>
/// Represents a category. This is an individual budget item
/// such as I want to save 200 a bucks a month, or have
/// a budget of $600 a month for groceries.
/// </summary>
public class BudgetItem
{
    /// <summary>
    /// The <see cref="BudgetItem.Id"/>
    /// </summary>
    [Required]
    public Guid Id { get; set; }

    /// <summary>
    /// The <see cref="BudgetItem.Title"/>
    /// </summary>
    public required string Title { get; set; }

    /// <summary>
    /// How much to assign to this <see cref="BudgetItem"/>
    /// </summary>
    public double Target { get; set; }

    /// <summary>
    /// How much has been spent on this <see cref="BudgetItem"/>
    /// </summary>
    [NotMapped]
    public double Outflow { get; set; }

    /// <summary>
    /// How much has been assigned to this <see cref="BudgetItem"/>
    /// </summary>
    [NotMapped]
    public double Assigned { get; set; }

    /// <summary>
    /// the <see cref="BudgetGroup.Id"/> of this <see cref="BudgetItem"/>
    /// </summary>
    public Guid BudgetGroupId { get; set; }

    /// <summary>
    /// The date when
    /// </summary>
    public DateTime DateCreated { get; set; }
}