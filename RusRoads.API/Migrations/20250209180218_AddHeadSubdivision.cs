using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RusRoads.API.Migrations
{
    /// <inheritdoc />
    public partial class AddHeadSubdivision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HeadSubdivisionId",
                table: "Subdivisions",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subdivisions_HeadSubdivisionId",
                table: "Subdivisions",
                column: "HeadSubdivisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subdivisions_Subdivisions_HeadSubdivisionId",
                table: "Subdivisions",
                column: "HeadSubdivisionId",
                principalTable: "Subdivisions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subdivisions_Subdivisions_HeadSubdivisionId",
                table: "Subdivisions");

            migrationBuilder.DropIndex(
                name: "IX_Subdivisions_HeadSubdivisionId",
                table: "Subdivisions");

            migrationBuilder.DropColumn(
                name: "HeadSubdivisionId",
                table: "Subdivisions");
        }
    }
}
