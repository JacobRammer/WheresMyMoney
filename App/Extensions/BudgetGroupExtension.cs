using App.DTOs;
using Domain.Models.BudgetGroup;

namespace App.Extensions;

/// <summary>
/// Holds all <see cref="BudgetGroup"/> extension methods
/// </summary>
public static class BudgetGroupExtension
{
    /// <summary>
    /// Converts a <see cref="BudgetGroup"/> domain object to a <see cref="BudgetGroupDto"/>
    /// </summary>
    /// <param name="group">The <see cref="BudgetGroup"/> object</param>
    /// <returns>a new <see cref="BudgetGroupDto"/></returns>
    public static BudgetGroupDto ToDto(this BudgetGroup group)
    {
        return new BudgetGroupDto
        {
            Id = group.Id,
            Name = group.Name
        };
        
    }
}