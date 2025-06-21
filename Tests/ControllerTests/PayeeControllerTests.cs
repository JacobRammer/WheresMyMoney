using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using DataAccess;
using Domain.Enums.Transactions;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Tests.ControllerTests
{
    [Collection("Sequential")]
    public class PayeeControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly CustomWebApplicationFactory<Program> _factory;
        private readonly HttpClient _httpClient;

        public PayeeControllerTests(CustomWebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _httpClient = _factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false,
            });
        }

        [Fact]
        public async Task TestCreateFetchPayee()
        {
            // Arrange: Clear DB and create payees via API
            using (var scope = _factory.Services.CreateScope())
            {
                var scopedServices = scope.ServiceProvider;
                var db = scopedServices.GetRequiredService<DataContext>();
                if (db.Payees.Count() > 0)
                    db.Payees.RemoveRange(db.Payees);
                if (db.Transactions.Count() > 0)
                {
                    db.Transactions.RemoveRange(db.Transactions);
                    try
                    {
                        await db.SaveChangesAsync();
                    }
                    catch (Exception e)
                    { }

                }

                var payees = new[]
            {
                new Payee { Id = Guid.NewGuid(), PayeeName = "Alice's Groceries" },
                new Payee { Id = Guid.NewGuid(), PayeeName = "Bob's Books" },
                new Payee { Id = Guid.NewGuid(), PayeeName = "Charlie's Cafe" }
            };

                foreach (var payee in payees)
                {
                    var response = await _httpClient.PostAsJsonAsync("/api/Payee", payee);
                    response.StatusCode.Should().Be(HttpStatusCode.OK);
                }

                // Act: Get all payees
                var getResponse = await _httpClient.GetAsync("/api/Payee");
                var result = await getResponse.Content.ReadFromJsonAsync<List<Payee>>();
                getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
                result.Should().HaveCount(3);
                result.Select(p => p.PayeeName).Should().Contain(new[] { "Alice's Groceries", "Bob's Books", "Charlie's Cafe" });
                db.Dispose();
            }


        }

        [Fact]
        public async Task TestPayeeDelete()
        {
            // Arrange: Add a payee to the database
            var payee = new Payee { Id = Guid.NewGuid(), PayeeName = "Delete Me" };
            using (var scope = _factory.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<DataContext>();
                await db.Payees.AddAsync(payee);
                db.Database.EnsureCreated();
                await db.SaveChangesAsync();
                // Act: Delete the payee
                var deleteResponse = await _httpClient.DeleteAsync($"/api/Payee/{payee.Id}");
                deleteResponse.StatusCode.Should().Be(HttpStatusCode.OK);

                // Assert: Ensure the payee is deleted
                var getResponse = await _httpClient.GetAsync("/api/Payee");
                var payees = await getResponse.Content.ReadFromJsonAsync<List<Payee>>();
                payees.Should().NotContain(p => p.Id == payee.Id);

                db.Dispose();
            }


        }
    }
}