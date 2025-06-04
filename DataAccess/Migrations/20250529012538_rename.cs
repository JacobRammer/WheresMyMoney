using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class rename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_CategoryGroups_BudgetGroupId",
                table: "Categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoryGroups",
                table: "CategoryGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "CategoryGroups",
                newName: "BudgetGroups");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "BudgetItems");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_BudgetGroupId",
                table: "BudgetItems",
                newName: "IX_BudgetItems_BudgetGroupId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BudgetGroups",
                table: "BudgetGroups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BudgetItems",
                table: "BudgetItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BudgetItems_BudgetGroups_BudgetGroupId",
                table: "BudgetItems",
                column: "BudgetGroupId",
                principalTable: "BudgetGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BudgetItems_BudgetGroups_BudgetGroupId",
                table: "BudgetItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BudgetItems",
                table: "BudgetItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BudgetGroups",
                table: "BudgetGroups");

            migrationBuilder.RenameTable(
                name: "BudgetItems",
                newName: "Categories");

            migrationBuilder.RenameTable(
                name: "BudgetGroups",
                newName: "CategoryGroups");

            migrationBuilder.RenameIndex(
                name: "IX_BudgetItems_BudgetGroupId",
                table: "Categories",
                newName: "IX_Categories_BudgetGroupId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoryGroups",
                table: "CategoryGroups",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_CategoryGroups_BudgetGroupId",
                table: "Categories",
                column: "BudgetGroupId",
                principalTable: "CategoryGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
