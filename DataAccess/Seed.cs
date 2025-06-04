using Domain.Enums;
using Domain.Models.Accounts;
using Domain.Models.Budgets;
using Domain.Models.Transactions;

namespace DataAccess;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (!context.Accounts.Any())
        {
            Account account1 = new Account
            {
                Name = "Checking",
                Id = new Guid(),
                Balance = 100,
                AccountType = AccountType.Checking,
                Description = "Checking Account",
                InterestRate = 0,
                MonthlyPayment = 0
            };

            Account account2 = new Account
            {
                Name = "Savings",
                Id = new Guid(),
                Balance = 200,
                AccountType = AccountType.Savings,
                Description = "Savings Account",
                InterestRate = 0,
                MonthlyPayment = 0
            };

            Account account3 = new Account
            {
                Name = "Credit",
                Id = new Guid(),
                Balance = -100,
                AccountType = AccountType.Credit,
                Description = "Credit Account",
                InterestRate = 0,
                MonthlyPayment = 0
            };

            Account account4 = new Account
            {
                Name = "Loan",
                Id = new Guid(),
                Balance = -200,
                AccountType = AccountType.Loan,
                Description = "Loan Account",
                InterestRate = 0,
                MonthlyPayment = 0
            };


            List<Transaction> account1Transactions = new()
            {
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    Title = "Groceries Payment",
                    Amount = -20.5,
                    Date = DateTime.Now.AddDays(-5)
                },
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    Title = "Salary Deposit",
                    Amount = 150.0,
                    Date = DateTime.Now.AddMonths(-1)
                }
            };

            List<Transaction> account2Transactions = new()
            {
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    Title = "Savings Interest",
                    Amount = 5.0,
                    Date = DateTime.Now.AddDays(-30)
                },
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    Title = "Savings Deposit",
                    Amount = 50.0,
                    Date = DateTime.Now.AddMonths(-2)
                }
            };

            List<Transaction> account3Transactions = new()
            {
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    Title = "Credit Card Payment",
                    Amount = 75,
                    Date = DateTime.Now.AddDays(-15)
                },
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    Title = "Credit Card Fee",
                    Amount = -25,
                    Date = DateTime.Now.AddDays(-20)
                }
            };

            List<Transaction> account4Transactions = new()
            {
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    Title = "Loan Payment",
                    Amount = 100,
                    Date = DateTime.Now.AddMonths(-1)
                },
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    Title = "Loan Adjustment",
                    Amount = -50,
                    Date = DateTime.Now.AddMonths(-3)
                }
            };

            account1Transactions.ForEach(account1.AddTransaction);
            account2Transactions.ForEach(account2.AddTransaction);
            account3Transactions.ForEach(account3.AddTransaction);
            account4Transactions.ForEach(account4.AddTransaction);

            List<Account> accounts = new()
            {
                account1,
                account2,
                account3,
                account4
            };


            var monthlyBills = new BudgetGroup
            {
                Id = Guid.NewGuid(),
                Title = "Monthly Bills",
                Categories = new List<BudgetItem>
                {
                    new() { Id = Guid.NewGuid(), Title = "Rent", Target = 1200, Outflow = 0, Assigned = 0 },
                    new() { Id = Guid.NewGuid(), Title = "Utilities", Target = 200, Outflow = 0, Assigned = 0 },
                    new() { Id = Guid.NewGuid(), Title = "Internet", Target = 80, Outflow = 0, Assigned = 0 }
                }
            };

            var everydayExpenses = new BudgetGroup
            {
                Id = Guid.NewGuid(),
                Title = "Everyday Expenses",
                Categories = new List<BudgetItem>
                {
                    new() { Id = Guid.NewGuid(), Title = "Groceries", Target = 600, Outflow = 0, Assigned = 0 },
                    new() { Id = Guid.NewGuid(), Title = "Transportation", Target = 150, Outflow = 0, Assigned = 0 },
                    new() { Id = Guid.NewGuid(), Title = "Entertainment", Target = 200, Outflow = 0, Assigned = 0 }
                }
            };

            var goals = new BudgetGroup
            {
                Id = Guid.NewGuid(),
                Title = "Goals",
                Categories = new List<BudgetItem>
                {
                    new() { Id = Guid.NewGuid(), Title = "Emergency Fund", Target = 5000, Outflow = 0, Assigned = 0 },
                    new() { Id = Guid.NewGuid(), Title = "Vacation", Target = 2000, Outflow = 0, Assigned = 0 },
                    new() { Id = Guid.NewGuid(), Title = "New Car", Target = 15000, Outflow = 0, Assigned = 0 }
                }
            };

            await context.Accounts.AddRangeAsync(accounts);
            await context.Transactions.AddRangeAsync(account1Transactions);
            await context.Transactions.AddRangeAsync(account2Transactions);
            await context.Transactions.AddRangeAsync(account3Transactions);
            await context.Transactions.AddRangeAsync(account4Transactions);
            await context.BudgetGroups.AddRangeAsync(new[] { monthlyBills, everydayExpenses, goals });
            await context.SaveChangesAsync();
        }
    }
}