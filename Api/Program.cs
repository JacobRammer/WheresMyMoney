using System.Text.Json.Serialization;
using App.Core;
using App.Mediatr.Accounts.CashAccounts;
using DataAccess;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
;
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy => { policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("*"); });
});


var conStrBuilder = new SqlConnectionStringBuilder(
    builder.Configuration.GetConnectionString("AppConnectionString"));
conStrBuilder.Password = builder.Configuration["DbPassword"];
var connection = conStrBuilder.ConnectionString;
builder.Services.AddDbContext<DataContext>(opt => { opt.UseSqlServer(connection); });

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAccount.Handler).Assembly));
// Register MediatR services
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

var app = builder.Build();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<DataContext>();

await context.Database.MigrateAsync();
await Seed.SeedData(context);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");
app.UseAuthorization();
app.MapControllers();
app.Run();