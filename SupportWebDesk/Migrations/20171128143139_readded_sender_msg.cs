using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SupportWebDesk.Migrations
{
    public partial class readded_sender_msg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TicketCreated",
                table: "Mails");

            migrationBuilder.AddColumn<string>(
                name: "Sender",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Processed",
                table: "Mails",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sender",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Processed",
                table: "Mails");

            migrationBuilder.AddColumn<bool>(
                name: "TicketCreated",
                table: "Mails",
                nullable: false,
                defaultValue: false);
        }
    }
}
