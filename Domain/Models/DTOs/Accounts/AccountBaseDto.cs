using Domain.Enums;

namespace Domain.Models.DTOs.Accounts;

public class AccountBaseDto
{
    /// <summary>
    /// The account name
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// the account balance
    /// </summary>
    public double Balance { get; set; }
    
    /// <summary>
    /// The <see cref="AccountType"/> of the account
    /// </summary>
    public AccountType AccountType { get; set; }

    public string? Description { get; set; }
}