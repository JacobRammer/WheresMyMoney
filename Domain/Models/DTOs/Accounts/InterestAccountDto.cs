namespace Domain.Models.DTOs.Accounts;

public class InterestAccountDto : AccountBaseDto
{
    public double InterestRate { get; set; }

    public double MonthlyPayment { get; set; }
}