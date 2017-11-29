using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SupportWebDesk.Migrations
{
    public partial class emailsendercol_added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RequesterMail",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MessageId",
                table: "Mails",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SenderEmail",
                table: "Mails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mails_MessageId",
                table: "Mails",
                column: "MessageId",
                unique: true,
                filter: "[MessageId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Mails_MessageId",
                table: "Mails");

            migrationBuilder.DropColumn(
                name: "RequesterMail",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "SenderEmail",
                table: "Mails");

            migrationBuilder.AlterColumn<string>(
                name: "MessageId",
                table: "Mails",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}
