namespace Domain.Models.DTOs.Accounts;

public class LoanAccountDto : AccountBaseDto
{
    public double InterestRate { get; set; }

    public double MonthlyPayment { get; set; }
}