using App.Mediatr.Accounts.CashAccounts;
using App.Mediatr.Accounts.CreditAccounts;
using App.Mediatr.BudgetCategory;
using BudgetApp.Controllers.Accounts;
using Domain.Models.Accounts;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Tests;

public class TestCashAccount
{
    private readonly CashAccountController _cashController;
    private IMediator _mediator;
    
    // builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAll.Handler).Assembly));


    public TestCashAccount()
    {
        var services = new ServiceCollection();
        var serviceProvider = services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAll.Handler).Assembly)).BuildServiceProvider();
        
        _cashController = new CashAccountController();
        _mediator = serviceProvider.GetRequiredService<IMediator>();
    }

    [Fact]
    public async void Test1()
    {
        var query = new GetAllCashAccounts();
        var response = await _mediator.Send(new GetAllCashAccounts.Query());
        Assert.IsType<List<CashAccount>>(response);
    }
}