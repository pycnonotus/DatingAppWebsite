using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class chanegKeyForUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Contrary",
                table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Contrary",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }
    }
}
