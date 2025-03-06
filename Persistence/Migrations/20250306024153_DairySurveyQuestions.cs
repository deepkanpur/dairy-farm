using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class DairySurveyQuestions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SurveyBetterFodderManagement",
                table: "DairyFarms",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SurveyBetterMilkProduction",
                table: "DairyFarms",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SurveyFodderRequirement",
                table: "DairyFarms",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SurveyNutrition",
                table: "DairyFarms",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SurveyBetterFodderManagement",
                table: "DairyFarms");

            migrationBuilder.DropColumn(
                name: "SurveyBetterMilkProduction",
                table: "DairyFarms");

            migrationBuilder.DropColumn(
                name: "SurveyFodderRequirement",
                table: "DairyFarms");

            migrationBuilder.DropColumn(
                name: "SurveyNutrition",
                table: "DairyFarms");
        }
    }
}
