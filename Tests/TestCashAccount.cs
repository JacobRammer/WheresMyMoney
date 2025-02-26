using App.Mediatr.Accounts.CashAccounts;
using App.Mediatr.BudgetCategory;
using BudgetApp.Controllers.Accounts;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Tests;

public class TestCashAccount
{
    private readonly AccountController _controller;
    private IMediator _mediator;

    // builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAll.Handler).Assembly));


    public TestCashAccount()
    {
        var services = new ServiceCollection();
        var serviceProvider = services
            .AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAll.Handler).Assembly))
            .BuildServiceProvider();

        _controller = new AccountController();
        _mediator = serviceProvider.GetRequiredService<IMediator>();
    }

    [Fact]
    public async void Test1()
    {
        var query = new GetAllAccounts();
        var response = await _mediator.Send(new GetAllAccounts.Query());
        // Assert.IsType<List<CashAccount>>(response);
    }
}