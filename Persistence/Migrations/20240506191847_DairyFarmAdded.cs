using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class DairyFarmAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DairyFarms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BusinessName = table.Column<string>(type: "TEXT", nullable: true),
                    ContactName = table.Column<string>(type: "TEXT", nullable: true),
                    ContactNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Pincode = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    Area = table.Column<string>(type: "TEXT", nullable: true),
                    Landmark = table.Column<string>(type: "TEXT", nullable: true),
                    City = table.Column<string>(type: "TEXT", nullable: true),
                    BuffaloCount = table.Column<short>(type: "INTEGER", nullable: false),
                    CowCount = table.Column<short>(type: "INTEGER", nullable: false),
                    WorkerCount = table.Column<short>(type: "INTEGER", nullable: false),
                    Latitude = table.Column<decimal>(type: "TEXT", nullable: false),
                    Longitude = table.Column<decimal>(type: "TEXT", nullable: false),
                    AddedById = table.Column<string>(type: "TEXT", nullable: true),
                    AddedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DairyFarms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DairyFarms_AspNetUsers_AddedById",
                        column: x => x.AddedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DairyFarmPhoto",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    IsMain = table.Column<bool>(type: "INTEGER", nullable: false),
                    Latitude = table.Column<decimal>(type: "TEXT", nullable: false),
                    Longitude = table.Column<decimal>(type: "TEXT", nullable: false),
                    AddedById = table.Column<string>(type: "TEXT", nullable: true),
                    AddedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    DairyFarmId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DairyFarmPhoto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DairyFarmPhoto_AspNetUsers_AddedById",
                        column: x => x.AddedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DairyFarmPhoto_DairyFarms_DairyFarmId",
                        column: x => x.DairyFarmId,
                        principalTable: "DairyFarms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DairyFarmPhoto_AddedById",
                table: "DairyFarmPhoto",
                column: "AddedById");

            migrationBuilder.CreateIndex(
                name: "IX_DairyFarmPhoto_DairyFarmId",
                table: "DairyFarmPhoto",
                column: "DairyFarmId");

            migrationBuilder.CreateIndex(
                name: "IX_DairyFarms_AddedById",
                table: "DairyFarms",
                column: "AddedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DairyFarmPhoto");

            migrationBuilder.DropTable(
                name: "DairyFarms");
        }
    }
}
