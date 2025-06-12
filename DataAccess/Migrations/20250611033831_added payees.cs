using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addedpayees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BudgetItems_BudgetItemCategories_CategoryId",
                table: "BudgetItems");

            migrationBuilder.DropTable(
                name: "BudgetItemCategories");

            migrationBuilder.DropIndex(
                name: "IX_BudgetItems_CategoryId",
                table: "BudgetItems");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "BudgetItems");

            migrationBuilder.AddColumn<int>(
                name: "MyProperty",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "PayeeId",
                table: "Transactions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Payees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PayeeName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payees", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_PayeeId",
                table: "Transactions",
                column: "PayeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Payees_PayeeId",
                table: "Transactions",
                column: "PayeeId",
                principalTable: "Payees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Payees_PayeeId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "Payees");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_PayeeId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "PayeeId",
                table: "Transactions");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "BudgetItems",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "BudgetItemCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetItemCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetItems_CategoryId",
                table: "BudgetItems",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetItems_BudgetItemCategories_CategoryId",
                table: "BudgetItems",
                column: "CategoryId",
                principalTable: "BudgetItemCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
