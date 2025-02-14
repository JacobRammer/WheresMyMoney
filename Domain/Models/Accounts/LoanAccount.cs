namespace Domain.Models.Accounts;

/// <summary>
/// Represents a loan (car loan, student loan, etc)
/// </summary>
public class LoanAccount : AccountBase
{
    public double InterestRate { get; set; }

    public double MonthlyPayment { get; set; }
}