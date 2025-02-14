using Domain.Models.Accounts;
using Domain.Models.BudgetGroup;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    private readonly DbContextOptions _options = options;

    public DbSet<BudgetGroup> Groups { get; set; }

    public DbSet<CashAccount> CashAccounts { get; set; }

    public DbSet<CreditAccount> CreditAccounts { get; set; }
    
    public DbSet<LoanAccount> LoanAccounts { get; set; }
}