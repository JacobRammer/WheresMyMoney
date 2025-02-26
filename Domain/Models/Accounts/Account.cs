using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain.Models.Accounts;

/// <summary>
/// Base class for all accounts.
/// </summary>
public class Account
{
    /// <summary>
    /// The account ID
    /// </summary>
    [Required]
    public Guid Id { get; set; }

    /// <summary>
    /// The account name
    /// </summary>
    [Required]
    public required string Name { get; set; }

    /// <summary>
    /// the account balance
    /// </summary>
    [Required]
    public double Balance { get; set; }

    /// <summary>
    /// The <see cref="AccountType"/> of the account
    /// </summary>
    [Required]
    public AccountType AccountType { get; set; }

    /// <summary>
    /// The description of the account
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// The interest of the account
    /// </summary>
    public double? InterestRate { get; set; }

    /// <summary>
    /// The required monthly payment
    /// </summary>
    public double? MonthlyPayment { get; set; }
}