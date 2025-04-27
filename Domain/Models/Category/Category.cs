using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Category;

/// <summary>
/// Represents a category. This is an individual budget item
/// such as I want to save 200 a bucks a month, or have
/// a budget of $600 a month for groceries.
/// </summary>
public class Category
{
    /// <summary>
    /// The <see cref="Category.Id"/>
    /// </summary>
    [Required]
    public Guid Id { get; set; }

    /// <summary>
    /// The <see cref="Category.Title"/>
    /// </summary>
    public required string Title { get; set; }

    /// <summary>
    /// How much to assign to this <see cref="Category"/>
    /// </summary>
    public double Target { get; set; }

    /// <summary>
    /// How much has been spent on this <see cref="Category"/>
    /// </summary>
    public double Outflow { get; set; }

    /// <summary>
    /// How much has been assigned to this <see cref="Category"/>
    /// </summary>
    public double Inflow { get; set; }

    /// <summary>
    /// the <see cref="CategoryGroup.Id"/> of this <see cref="Category"/>
    /// </summary>
    public Guid CategoryGroupId { get; set; }
}