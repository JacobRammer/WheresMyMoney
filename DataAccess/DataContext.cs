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
    /// https://learn.microsoft.com/en-us/answers/questions/1188216/is-there-a-way-to-say-an-entry-is-unique-across-2
    /// refer to that later when these are all tied to a user id
    /// </summary>
    public DbSet<Payee> Payees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Payee>().HasIndex(p => new { p.PayeeName }).IsUnique();
        base.OnModelCreating(modelBuilder);
    }
}