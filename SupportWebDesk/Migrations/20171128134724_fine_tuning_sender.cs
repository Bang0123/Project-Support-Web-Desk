using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SupportWebDesk.Migrations
{
    public partial class fine_tuning_sender : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_AspNetUsers_RequesterId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_RequesterId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "RequesterId",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "Requester",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Requester",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "RequesterId",
                table: "Tickets",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_RequesterId",
                table: "Tickets",
                column: "RequesterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_AspNetUsers_RequesterId",
                table: "Tickets",
                column: "RequesterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
