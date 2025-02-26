using Domain.Enums;
using Domain.Models.Accounts;

namespace DataAccess;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (!context.Accounts.Any())
        {
            List<Account> accounts = new()
            {
                new Account
                {
                    Name = "Checking",
                    Id = new Guid(),
                    Balance = 100,
                    AccountType = AccountType.Checking,
                    Description = "Checking Account",
                    InterestRate = 0,
                    MonthlyPayment = 0
                },

                new Account
                {
                    Name = "Savings",
                    Id = new Guid(),
                    Balance = 200,
                    AccountType = AccountType.Savings,
                    Description = "Savings Account",
                    InterestRate = 0,
                    MonthlyPayment = 0
                },

                new Account
                {
                    Name = "Credit",
                    Id = new Guid(),
                    Balance = -100,
                    AccountType = AccountType.Credit,
                    Description = "Credit Account",
                    InterestRate = 0,
                    MonthlyPayment = 0
                },

                new Account
                {
                    Name = "Loan",
                    Id = new Guid(),
                    Balance = -200,
                    AccountType = AccountType.Loan,
                    Description = "Loan Account",
                    InterestRate = 0,
                    MonthlyPayment = 0
                }
            };

            await context.Accounts.AddRangeAsync(accounts);
            await context.SaveChangesAsync();
        }
    }
}