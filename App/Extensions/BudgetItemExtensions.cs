using DataAccess;
using Domain.Models.Budgets;
using Domain.Models.DTOs.Category;
using Microsoft.EntityFrameworkCore;

namespace App.Extensions
{
    public static class BudgetItemExtensions
    {
        public static void GetTransactionsAndCalculateSpending(this CategoryGroupDto dto, DataContext context, int month)
        {
            var transactions = context.Transactions.ToList();
            var assignedTransaction = context.AssignedTransactions.ToList();

            // Get the transactions
            foreach (var budget in dto.Categories)
            {
                var budgetTransactions = transactions.Where(t => t.BudgetItemId == budget.Id && t.Date.Month == month).ToList();

                // Calculate the outflow of the budget item
                budget.Outflow = budgetTransactions.Sum(t => t.Amount);

                // Calculate the assigned
                budget.Assigned = assignedTransaction.Where(t => t.BudgetItemId == budget.Id).ToList()
                    .Sum(t => t.Amount);
            }
        }
    }
}