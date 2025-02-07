using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Accounts;

/// <summary>
/// Base class for all accounts.
/// </summary>
public class AccountBase
{
    /// <summary>
    /// The account ID
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// The account name
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// the account balance
    /// </summary>
    public double Balance { get; set; }
}