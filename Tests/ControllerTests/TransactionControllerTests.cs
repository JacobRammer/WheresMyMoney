using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using DataAccess;
using Domain.Models.Transactions;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Tests.ControllerTests;

[Collection("Sequential")]
public class TransactionControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly CustomWebApplicationFactory<Program> _factory;
    private readonly HttpClient _httpClient;
    private readonly JsonSerializerOptions _jsonOptions = new() 
    { 
        PropertyNameCaseInsensitive = true
    };

    public TransactionControllerTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _httpClient = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false,
        });
    }

    private async Task<DataContext> CreateTestDatabase()
    {
        var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<DataContext>();
        db.Database.EnsureCreated();
        db.Accounts.RemoveRange(db.Accounts);
        db.Transactions.RemoveRange(db.Transactions);
        await Seed.SeedDB(db);
        return db;
    }

    private StringContent CreateJsonContent(object obj)
    {
        var json = JsonConvert.SerializeObject(obj);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        return content;
    }

    [Fact]
    public async Task GetTransaction_WithValidId_ReturnsTransaction()
    {
        // Arrange
        Guid transactionId;
        using (var db = await CreateTestDatabase())
        {
            transactionId = db.Transactions.First().Id;
        }

        // Act
        var response = await _httpClient.GetAsync($"/api/Transaction/{transactionId}");
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var transaction = await response.Content.ReadFromJsonAsync<Transaction>(_jsonOptions);
        transaction.Should().NotBeNull();
        transaction.Id.Should().Be(transactionId);
    }
    
    [Fact]
    public async Task GetTransaction_WithInvalidId_ReturnsNotFound()
    {
        // Arrange
        var nonExistentId = Guid.NewGuid();
        
        // Act
        var response = await _httpClient.GetAsync($"/api/Transaction/{nonExistentId}");
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
    
    [Fact]
    public async Task GetAllAccountTransactions_WithInvalidAccountId_ReturnsNotFound()
    {
        // Arrange
        var nonExistentAccountId = Guid.NewGuid();
        
        // Act
        var response = await _httpClient.GetAsync($"/api/Transaction/account/{nonExistentAccountId}");
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task CreateTransaction_WithValidData_CreatesTransactionAndReturnsOk()
    {
        // Arrange
        Guid accountId;
        using (var db = await CreateTestDatabase())
        {
            accountId = db.Accounts.First().Id;
        }        var newTransaction = new Transaction
        {
            Title = "Test Transaction",
            AccountId = accountId,
            Amount = 123.45,
            Date = DateTime.Now.Date,
            Id = Guid.NewGuid()
        };

        // Act
        var response = await _httpClient.PostAsync("api/Transaction", CreateJsonContent(newTransaction));

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        // Verify transaction was added to database
        using (var scope = _factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<DataContext>();
            var savedTransaction = await db.Transactions
                .FirstOrDefaultAsync(t => t.Title == "Test Transaction" && t.AccountId == accountId);
            
            savedTransaction.Should().NotBeNull();
            savedTransaction.Amount.Should().Be(123.45);
        }
    }
    
    [Fact]
    public async Task CreateTransaction_WithInvalidAccountId_ReturnsBadRequest()
    {
        // Arrange
        var nonExistentAccountId = Guid.NewGuid();
        
        var newTransaction = new Transaction
        {
            Title = "Invalid Transaction",
            AccountId = nonExistentAccountId,
            Amount = 50.0,
            Date = DateTime.Now.Date
        };

        // Act
        var response = await _httpClient.PostAsync("api/Transaction", CreateJsonContent(newTransaction));

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task DeleteTransaction_WithValidId_DeletesTransactionAndReturnsOk()
    {
        // Arrange
        Guid transactionId;
        using (var db = await CreateTestDatabase())
        {
            transactionId = db.Transactions.First().Id;
        }

        // Act
        var response = await _httpClient.DeleteAsync($"/api/Transaction/{transactionId}");
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        // Verify the transaction was deleted
        using (var scope = _factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<DataContext>();
            var deleted = db.Transactions.Find(transactionId);
            deleted.Should().BeNull();
        }
    }
    
    [Fact]
    public async Task DeleteTransaction_WithInvalidId_ReturnsNotFound()
    {
        // Arrange
        var nonExistentId = Guid.NewGuid();
        
        // Act
        var response = await _httpClient.DeleteAsync($"/api/Transaction/{nonExistentId}");
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task UpdateTransaction_WithValidData_UpdatesTransactionAndReturnsOk()
    {
        // Arrange
        Guid transactionId;
        Guid accountId;
        using (var db = await CreateTestDatabase())
        {
            var transaction = db.Transactions.First();
            transactionId = transaction.Id;
            accountId = transaction.AccountId;
        }

        var updatedTransaction = new Transaction
        {
            Id = transactionId,
            Title = "Updated Transaction Title",
            Amount = 987.65,
            Date = DateTime.Now.Date,
            AccountId = accountId
        };

        // Act
        var response = await _httpClient.PutAsync("/api/Transaction", CreateJsonContent(updatedTransaction));
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        // Verify the transaction was updated
        using (var scope = _factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<DataContext>();
            var transaction = db.Transactions.Find(transactionId);
            transaction.Should().NotBeNull();
            transaction.Title.Should().Be("Updated Transaction Title");
            transaction.Amount.Should().Be(987.65);
        }
    }
    
    [Fact]
    public async Task UpdateTransaction_WithInvalidId_ReturnsNotFound()
    {
        // Arrange
        var nonExistentId = Guid.NewGuid();
        var accountId = Guid.NewGuid();
        using (var db = await CreateTestDatabase())
        {
            accountId = db.Accounts.First().Id;
        }
        
        var updatedTransaction = new Transaction
        {
            Id = nonExistentId,
            Title = "This Transaction Doesn't Exist",
            Amount = 100.0,
            AccountId = accountId
        };
        
        // Act
        var response = await _httpClient.PutAsync("/api/Transaction", CreateJsonContent(updatedTransaction));
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}
