using DataAccess;
using Domain.Models.Budgets;
using Domain.Models.DTOs.Category;

namespace App.Extensions
{
    public static class BudgetItemExtensions
    {
        public static void GetTransactionsAndCalculateSpending(this CategoryGroupDto dto, DataContext context)
        {
            var transactions = context.Transactions.ToList();

            // Get the transactions
            foreach (var budget in dto.Categories)
            {
                var budgetTransactions = transactions.Where(t => t.BudgetItemId == budget.Id).ToList();
                
                // Calculate the outflow of the budget item
                budget.Outflow = budgetTransactions.Sum(t => t.Amount);
            }

            
        }
    }
}