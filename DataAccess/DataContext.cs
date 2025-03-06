using Domain.Models.Accounts;
using Domain.Models.BudgetGroup;
using Domain.Models.Transactions;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    private readonly DbContextOptions _options = options;

    /// <summary>
    /// The <see cref="BudgetGroup"/> db table
    /// </summary>
    public DbSet<BudgetGroup> Groups { get; set; }

    /// <summary>
    /// The <see cref="Account"/> db table
    /// </summary>
    public DbSet<Account> Accounts { get; set; }

    /// <summary>
    /// The <see cref="Transaction"/> db table
    /// </summary>
    public DbSet<Transaction> Transactions { get; set; }
}