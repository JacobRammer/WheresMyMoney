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
    /// The <see cref="Budget"/> db table
    /// </summary>
    public DbSet<BudgetGroup> CategoryGroups { get; set; }

    /// <summary>
    /// The <see cref="Budget"/> db table
    /// </summary>
    public DbSet<Budget> Categories { get; set; }
}