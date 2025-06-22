using Domain.Enums.Transactions;

namespace Domain.Models.Transactions;

public class Transaction
{
    /// <summary>
    /// The id
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// The title of the transaction
    /// </summary>
    public required string Title { get; set; }

    /// <summary>
    /// The amount of the transaction
    /// </summary>
    public double Amount { get; set; }

    /// <summary>
    /// The date and time of the transaction
    /// </summary>
    public DateTime Date { get; set; }

    /// <summary>
    /// The id of the account
    /// </summary>
    public Guid AccountId { get; set; }

    /// <summary>
    /// The <see cref="Payee"/> of this transaction
    /// </summary>
    public Payee? Payee { get; set; }
}