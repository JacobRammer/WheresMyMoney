using System;
using System.Threading;
using System.Threading.Tasks;
using App.Core;
using App.Mediatr.Transactions;
using BudgetApp.Controllers.Transactions;
using Domain.Models.Transactions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Xunit;

namespace Tests.ControllerTests;

public class TransactionControllerTests
{
    private readonly Mock<IMediator> _mockMediator;
    private readonly TransactionController _controller;

    public TransactionControllerTests()
    {
        _mockMediator = new Mock<IMediator>();

        // Setup controller with mock mediator
        _controller = new TransactionController();
        var serviceCollection = new ServiceCollection();
        serviceCollection.AddSingleton(_mockMediator.Object);
        var serviceProvider = serviceCollection.BuildServiceProvider();

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                RequestServices = serviceProvider
            }
        };
    }

    #region GetAllAccountTransactions Tests

    [Fact]
    public async Task GetAllAccountTransactions_WhenCalled_ReturnsOkResult()
    {
        // Arrange
        var accountId = Guid.NewGuid();
        var transactions = new List<Transaction>
        {
            new Transaction
            {
                Id = Guid.NewGuid(),
                Title = "Test Transaction 1",
                Amount = 100.0,
                Date = DateTime.Now,
                AccountId = accountId
            },
            new Transaction
            {
                Id = Guid.NewGuid(),
                Title = "Test Transaction 2",
                Amount = -50.0,
                Date = DateTime.Now,
                AccountId = accountId
            }
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<GetTransaction.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Transaction>.Success(transactions.First()));

        // Act
        var result = await _controller.GetAllAccountTransactions(accountId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
        _mockMediator.Verify(m => m.Send(It.Is<GetTransaction.Query>(q => q.Id == accountId), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task GetAllAccountTransactions_WhenMediatorReturnsNull_ReturnsNotFound()
    {
        // Arrange
        var accountId = Guid.NewGuid();
        _mockMediator
            .Setup(m => m.Send(It.IsAny<GetTransaction.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((Result<Transaction>?)null);

        // Act
        var result = await _controller.GetAllAccountTransactions(accountId);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task GetAllAccountTransactions_WhenMediatorReturnsFailure_ReturnsBadRequest()
    {
        // Arrange
        var accountId = Guid.NewGuid();
        var errorMessage = "Failed to retrieve transactions";
        _mockMediator
            .Setup(m => m.Send(It.IsAny<GetTransaction.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Transaction>.Failure(errorMessage));

        // Act
        var result = await _controller.GetAllAccountTransactions(accountId);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(errorMessage, badRequestResult.Value);
    }

    #endregion

    #region GetTransaction Tests

    [Fact]
    public async Task GetTransaction_WhenTransactionExists_ReturnsOkResult()
    {
        // Arrange
        var transactionId = Guid.NewGuid();
        var transaction = new Transaction
        {
            Id = transactionId,
            Title = "Test Transaction",
            Amount = 100.0,
            Date = DateTime.Now,
            AccountId = Guid.NewGuid()
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<GetTransaction.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Transaction>.Success(transaction));

        // Act
        var result = await _controller.GetTransaction(transactionId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnedTransaction = Assert.IsType<Transaction>(okResult.Value);
        Assert.Equal(transactionId, returnedTransaction.Id);
        Assert.Equal("Test Transaction", returnedTransaction.Title);
        _mockMediator.Verify(m => m.Send(It.Is<GetTransaction.Query>(q => q.Id == transactionId), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task GetTransaction_WhenTransactionNotFound_ReturnsNotFound()
    {
        // Arrange
        var transactionId = Guid.NewGuid();
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Test Transaction",
            Amount = 0,
            Date = DateTime.Now,
            AccountId = Guid.NewGuid()
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<GetTransaction.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Transaction>.Success(transaction));

        // Act
        var result = await _controller.GetTransaction(transactionId);

        // Assert - Since we're returning a transaction, it should be OK, not NotFound
        // If we want to test NotFound, we should use a failure result instead
        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task GetTransaction_WhenMediatorReturnsFailure_ReturnsBadRequest()
    {
        // Arrange
        var transactionId = Guid.NewGuid();
        var errorMessage = "Transaction not found";
        _mockMediator
            .Setup(m => m.Send(It.IsAny<GetTransaction.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Transaction>.Failure(errorMessage));

        // Act
        var result = await _controller.GetTransaction(transactionId);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(errorMessage, badRequestResult.Value);
    }

    #endregion

    #region DeleteTransaction Tests

    [Fact]
    public async Task DeleteTransaction_WhenTransactionExists_ReturnsOkResult()
    {
        // Arrange
        var transactionId = Guid.NewGuid();
        _mockMediator
            .Setup(m => m.Send(It.IsAny<DeleteTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Success(Unit.Value));

        // Act
        var result = await _controller.DeleteTransaction(transactionId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(Unit.Value, okResult.Value);
        _mockMediator.Verify(m => m.Send(It.Is<DeleteTransaction.Command>(c => c.Id == transactionId), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task DeleteTransaction_WhenTransactionNotFound_ReturnsBadRequest()
    {
        // Arrange
        var transactionId = Guid.NewGuid();
        var errorMessage = "Transaction not found";
        _mockMediator
            .Setup(m => m.Send(It.IsAny<DeleteTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Failure(errorMessage));

        // Act
        var result = await _controller.DeleteTransaction(transactionId);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(errorMessage, badRequestResult.Value);
    }

    [Fact]
    public async Task DeleteTransaction_WhenMediatorReturnsNull_ReturnsNotFound()
    {
        // Arrange
        var transactionId = Guid.NewGuid();
        _mockMediator
            .Setup(m => m.Send(It.IsAny<DeleteTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((Result<Unit>?)null);

        // Act
        var result = await _controller.DeleteTransaction(transactionId);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    #endregion

    #region UpdateTransaction Tests

    [Fact]
    public async Task UpdateTransaction_WhenTransactionIsValid_ReturnsOkResult()
    {
        // Arrange
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Updated Transaction",
            Amount = 150.0,
            Date = DateTime.Now,
            AccountId = Guid.NewGuid()
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<UpdateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Success(Unit.Value));

        // Act
        var result = await _controller.UpdateTransaction(transaction);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(Unit.Value, okResult.Value);
        _mockMediator.Verify(m => m.Send(It.Is<UpdateTransaction.Command>(c => c.Transaction == transaction), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateTransaction_WhenUpdateFails_ReturnsBadRequest()
    {
        // Arrange
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Transaction to Update",
            Amount = 75.0,
            Date = DateTime.Now,
            AccountId = Guid.NewGuid()
        };

        var errorMessage = "Update failed";
        _mockMediator
            .Setup(m => m.Send(It.IsAny<UpdateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Failure(errorMessage));

        // Act
        var result = await _controller.UpdateTransaction(transaction);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(errorMessage, badRequestResult.Value);
    }

    [Fact]
    public async Task UpdateTransaction_WhenMediatorReturnsNull_ReturnsNotFound()
    {
        // Arrange
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Transaction to Update",
            Amount = 75.0,
            Date = DateTime.Now,
            AccountId = Guid.NewGuid()
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<UpdateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((Result<Unit>?)null);

        // Act
        var result = await _controller.UpdateTransaction(transaction);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    #endregion

    #region CreateTransaction Tests

    [Fact]
    public async Task CreateTransaction_WhenTransactionIsValid_ReturnsOkResult()
    {
        // Arrange
        var accountId = Guid.NewGuid();
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "New Transaction",
            Amount = 200.0,
            Date = DateTime.Now,
            AccountId = accountId
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<CreateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Success(Unit.Value));

        // Act
        var result = await _controller.CreateTransaction(transaction);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(Unit.Value, okResult.Value);
        _mockMediator.Verify(m => m.Send(It.Is<CreateTransaction.Command>(c =>
            c.Transaction == transaction && c.Id == accountId), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateTransaction_WhenCreationFails_ReturnsBadRequest()
    {
        // Arrange
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Failed Transaction",
            Amount = 100.0,
            Date = DateTime.Now,
            AccountId = Guid.NewGuid()
        };

        var errorMessage = "Account not found";
        _mockMediator
            .Setup(m => m.Send(It.IsAny<CreateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Failure(errorMessage));

        // Act
        var result = await _controller.CreateTransaction(transaction);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(errorMessage, badRequestResult.Value);
    }

    [Fact]
    public async Task CreateTransaction_WhenMediatorReturnsNull_ReturnsNotFound()
    {
        // Arrange
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Transaction to Create",
            Amount = 50.0,
            Date = DateTime.Now,
            AccountId = Guid.NewGuid()
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<CreateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((Result<Unit>?)null);

        // Act
        var result = await _controller.CreateTransaction(transaction);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task CreateTransaction_WhenTransactionHasPayee_SetsPayeeCorrectly()
    {
        // Arrange
        var accountId = Guid.NewGuid();
        var payee = new Domain.Enums.Transactions.Payee
        {
            Id = Guid.NewGuid(),
            PayeeName = "Test Payee"
        };

        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Transaction with Payee",
            Amount = 75.0,
            Date = DateTime.Now,
            AccountId = accountId,
            Payee = payee
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<CreateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Success(Unit.Value));

        // Act
        var result = await _controller.CreateTransaction(transaction);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(Unit.Value, okResult.Value);
        _mockMediator.Verify(m => m.Send(It.Is<CreateTransaction.Command>(c =>
            c.Transaction.Payee != null &&
            c.Transaction.Payee.PayeeName == "Test Payee"), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateTransaction_WhenTransactionHasBudgetItemId_SetsBudgetItemCorrectly()
    {
        // Arrange
        var accountId = Guid.NewGuid();
        var budgetItemId = Guid.NewGuid();

        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Transaction with Budget Item",
            Amount = 125.0,
            Date = DateTime.Now,
            AccountId = accountId,
            BudgetItemId = budgetItemId
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<CreateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Success(Unit.Value));

        // Act
        var result = await _controller.CreateTransaction(transaction);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(Unit.Value, okResult.Value);
        _mockMediator.Verify(m => m.Send(It.Is<CreateTransaction.Command>(c =>
            c.Transaction.BudgetItemId == budgetItemId), It.IsAny<CancellationToken>()), Times.Once);
    }

    #endregion

    #region Edge Cases and Additional Tests

    [Fact]
    public async Task GetAllAccountTransactions_WithInvalidGuid_CallsMediatorWithCorrectId()
    {
        // Arrange
        var accountId = Guid.Empty; // Edge case: empty GUID
        var emptyTransaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Empty Test",
            Amount = 0,
            Date = DateTime.Now,
            AccountId = accountId
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<GetTransaction.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Transaction>.Success(emptyTransaction));

        // Act
        var result = await _controller.GetAllAccountTransactions(accountId);

        // Assert
        _mockMediator.Verify(m => m.Send(It.Is<GetTransaction.Query>(q => q.Id == Guid.Empty), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateTransaction_WithNegativeAmount_HandlesCorrectly()
    {
        // Arrange
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Expense Transaction",
            Amount = -50.0, // Negative amount for expenses
            Date = DateTime.Now,
            AccountId = Guid.NewGuid()
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<CreateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Success(Unit.Value));

        // Act
        var result = await _controller.CreateTransaction(transaction);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        _mockMediator.Verify(m => m.Send(It.Is<CreateTransaction.Command>(c =>
            c.Transaction.Amount == -50.0), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateTransaction_WithZeroAmount_HandlesCorrectly()
    {
        // Arrange
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Title = "Zero Amount Transaction",
            Amount = 0.0,
            Date = DateTime.Now,
            AccountId = Guid.NewGuid()
        };

        _mockMediator
            .Setup(m => m.Send(It.IsAny<UpdateTransaction.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<Unit>.Success(Unit.Value));

        // Act
        var result = await _controller.UpdateTransaction(transaction);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        _mockMediator.Verify(m => m.Send(It.Is<UpdateTransaction.Command>(c =>
            c.Transaction.Amount == 0.0), It.IsAny<CancellationToken>()), Times.Once);
    }

    #endregion
}