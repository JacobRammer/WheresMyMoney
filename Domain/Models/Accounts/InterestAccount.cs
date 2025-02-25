namespace Domain.Models.Accounts;

public class InterestAccount : AccountBase
{
    public double InterestRate { get; set; }

    public double MonthlyPayment { get; set; }
}