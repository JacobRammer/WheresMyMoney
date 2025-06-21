using System;
using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Tests.ControllerTests;

[Collection("Sequential")]
public class BudgetGroupControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly CustomWebApplicationFactory<Program> _factory;
    private readonly HttpClient _httpClient;

    public BudgetGroupControllerTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _httpClient = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false,
        });
    }

    [Fact]
    public async Task TestCreateBudgetGroup()
    {
        // Arrange: Clear DB
        var scopeFactory = _factory.Services.GetRequiredService<IServiceScopeFactory>();
        using (var scope = scopeFactory.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<DataAccess.DataContext>();
            db.BudgetGroups.RemoveRange(db.BudgetGroups);
            await db.SaveChangesAsync();
            var group = new Domain.Models.Budgets.BudgetGroup
            {
                Id = Guid.NewGuid(),
                Title = "Test Group",
                DateCreated = DateTime.UtcNow
            };
            var response = await _httpClient.PostAsJsonAsync("/api/BudgetItemGroup", group);
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            db.Dispose();
        }

    }

    [Fact]
    public async Task TestDeleteBudgetGroup()
    {
        Guid id;
        var scopeFactory = _factory.Services.GetRequiredService<IServiceScopeFactory>();
        using (var scope = scopeFactory.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<DataAccess.DataContext>();
            db.BudgetGroups.RemoveRange(db.BudgetGroups);
            var group = new Domain.Models.Budgets.BudgetGroup { Id = Guid.NewGuid(), Title = "Delete Me", DateCreated = DateTime.UtcNow };
            db.BudgetGroups.Add(group);
            await db.SaveChangesAsync();
            id = group.Id;

            var response = await _httpClient.DeleteAsync($"/api/BudgetItemGroup?id={id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            db.Dispose();
        }

    }

    [Fact]
    public async Task TestEditBudgetGroup()
    {
        Guid id;
        var scopeFactory = _factory.Services.GetRequiredService<IServiceScopeFactory>();
        using (var scope = scopeFactory.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<DataAccess.DataContext>();
            db.BudgetGroups.RemoveRange(db.BudgetGroups);
            var group = new Domain.Models.Budgets.BudgetGroup { Id = Guid.NewGuid(), Title = "Edit Me", DateCreated = DateTime.UtcNow };
            db.BudgetGroups.Add(group);
            await db.SaveChangesAsync();
            id = group.Id;
            var updatedGroup = new Domain.Models.Budgets.BudgetGroup { Id = id, Title = "Edited Title", DateCreated = DateTime.UtcNow };
            var response = await _httpClient.PutAsJsonAsync($"/api/BudgetItemGroup/{id}", updatedGroup);
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            db.Dispose();
        }

    }

    [Fact]
    public async Task TestGetAllBudgetGroups()
    {
        var scopeFactory = _factory.Services.GetRequiredService<IServiceScopeFactory>();
        using (var scope = scopeFactory.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<DataAccess.DataContext>();
            db.BudgetGroups.RemoveRange(db.BudgetGroups);
            db.BudgetGroups.Add(new Domain.Models.Budgets.BudgetGroup { Id = Guid.NewGuid(), Title = "Group 1", DateCreated = DateTime.UtcNow });
            db.BudgetGroups.Add(new Domain.Models.Budgets.BudgetGroup { Id = Guid.NewGuid(), Title = "Group 2", DateCreated = DateTime.UtcNow });
            await db.SaveChangesAsync();
            var response = await _httpClient.GetAsync("/api/BudgetItemGroup");
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var groups = await response.Content.ReadFromJsonAsync<System.Collections.Generic.List<Domain.Models.Budgets.BudgetGroup>>();
            groups.Should().HaveCount(2);

            db.Dispose();
        }

    }
}
