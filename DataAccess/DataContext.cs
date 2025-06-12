using Domain.Enums.Transactions;
using Domain.Models.Accounts;
using Domain.Models.Budgets;
using Domain.Models.Transactions;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    private readonly DbContextOptions _options = options;

    /// <summary>
    /// The <see cref="Account"/> db table
    /// </summary>
    public DbSet<Account> Accounts { get; set; }

    /// <summary>
    /// The <see cref="Transaction"/> db table
    /// </summary>
    public DbSet<Transaction> Transactions { get; set; }

    /// <summary>
    /// The <see cref="BudgetItem"/> db table
    /// </summary>
    public DbSet<BudgetGroup> BudgetGroups { get; set; }

    /// <summary>
    /// The <see cref="BudgetItem"/> db table
    /// </summary>
    public DbSet<BudgetItem> BudgetItems { get; set; }

    /// <summary>
    /// The db table for categories
    /// </summary>
    public DbSet<Payee> Payees { get; set; }
}