using Domain.Enums;
using Domain.Models.Transactions;

namespace Domain.Models.DTOs.Accounts;

public class AccountDto
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

    /// <summary>
    /// The <see cref="AccountType"/> of the account
    /// </summary>
    public AccountType AccountType { get; set; }

    /// <summary>
    /// The description of the account
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// The interest of the account
    /// </summary>
    public double InterestRate { get; set; }

    /// <summary>
    /// The required monthly payment
    /// </summary>
    public double MonthlyPayment { get; set; }

    /// <summary>
    /// The list of <see cref="Transaction"/>
    /// </summary>
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}