using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp;
using SupportWebDesk.Data.Models;
using SupportWebDesk.Helpers.Services;

namespace SupportWebDesk.Data.Jobs
{
    public class TicketServiceJob
    {
        private readonly WebDeskContext _ctx;
        private readonly IEmailSender _ems;
        public TicketServiceJob(WebDeskContext dbContext, IEmailSender emailer)
        {
            _ems = emailer;
            _ctx = dbContext;
        }

        public async Task Invoke()
        {
            var unProcessedMails = _ctx.Mails.Where(mail => !mail.Processed).ToList();
            foreach (var mail in unProcessedMails)
            {
                try
                {
                    var match = Regex.Match(
                        input: mail.Subject, 
                        pattern: @"T: \d+ M: \d+ \|");
                    if (match.Success)
                    {
                        await CreateMessage(mail, match, _ctx);
                    }
                    else
                    {
                        await CreateTicket(mail, _ctx);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    await CreateTicket(mail, _ctx);
                }
                mail.Processed = true;
            }
            await _ctx.SaveChangesAsync();
        }

        private async Task CreateMessage(Mail mail, Match match, WebDeskContext ctx)
        {
            var tickid = Convert.ToInt32(Regex.Match(match.Value, @"\d+").Value.Trim());
            var ticket = await ctx.Tickets.FindAsync(tickid);
            if (ticket != null)
            {
                var msg = new Message()
                {
                    Author = null,
                    Body = mail.Body,
                    CreatedAt = mail.CreatedAt,
                    UpdatedAt = mail.UpdatedAt,
                    Sender = mail.Sender,
                    SenderEmail = mail.SenderEmail,
                    TicketId = ticket?.Id
                };
                _ctx.Messages.Add(msg);
                await _ctx.SaveChangesAsync();
            }
            else
            {
                await CreateTicket(mail, ctx);
            }
        }
        private async Task CreateTicket(Mail mail, WebDeskContext ctx)
        {
            var newTicket = new Ticket()
            {
                Body = mail.Body,
                Requester = mail.Sender,
                RequesterMail = mail.SenderEmail,
                Assignee = null,
                CreatedAt = mail.CreatedAt,
                UpdatedAt = mail.UpdatedAt,
                Subject = mail.Subject,
                Status = Ticket.STATUS_OPEN,
                Priority = Ticket.PRIORITY_NORMAL
            };
            ctx.Tickets.Add(newTicket);
            await _ctx.SaveChangesAsync();
            await _ems.AutoReply(newTicket.RequesterMail, newTicket.Requester, newTicket.Id, newTicket.Subject);
        }
    }
}
