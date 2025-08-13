using System.ComponentModel.DataAnnotations.Schema;
using Domain.Models.Transactions;

namespace Domain.Models.Budgets
{
    /// <summary>
    /// Similar to a <see cref="Transaction"/>, but represents a 
    /// transaction assigning money to a <see cref="BudgetItem"/>
    /// </summary>
    public class AssignedTransaction
    {
        /// <summary>
        /// The id
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// The <see cref="BudgetItem"/> Id
        /// </summary>
        public Guid BudgetItemId { get; set; }

        /// <summary>
        /// The date money was assigned
        /// </summary>
        public DateTime Date { get; set; }

        /// <summary>
        /// the amount assigned
        /// </summary>
        public double Amount { get; set; }

        /// <summary>
        /// The primary account ID
        /// </summary>
        [NotMapped]
        public Guid PrimaryAccountId { get; set; }
    }
}