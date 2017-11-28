using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using SupportWebDesk.Data.Models;

namespace SupportWebDesk.Data.Jobs
{
    public class TicketsControlJob
    {
        private WebDeskContext ctx;

        public TicketsControlJob(WebDeskContext dbContext)
        {
            ctx = dbContext;
        }

        public void invoke()
        {
            var mailsWithNoTickets = ctx.Mails.Where(mail => !mail.Processed);
            foreach (var mail in mailsWithNoTickets)
            {
                try
                {
                    var match = Regex.Match(mail.Subject, @"T: \d+ M: \d+");
                    if (match.Success)
                    {
                        CreateMessage(mail, match, ctx);
                    }
                    else
                    {
                        CreateTicket(mail, ctx);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                mail.Processed = true;
            }
            ctx.SaveChanges();
        }

        private void CreateMessage(Mail mail, Match match, WebDeskContext ctx)
        {
            var tickid = Convert.ToInt32(Regex.Match(match.Value, @"\d+").Value);
            var ticket = ctx.Tickets.Find(tickid);
            var msg = new Message()
            {
                Author = null,
                Body = mail.Body,
                CreatedAt = mail.CreatedAt,
                UpdatedAt = mail.UpdatedAt,
                Sender = mail.Sender,
                TicketId = tickid
            };
            ticket.Messages.Add(msg);
            ctx.SaveChanges();
        }
        private void CreateTicket(Mail mail, WebDeskContext ctx)
        {
            var newTicket = new Ticket()
            {
                Body = mail.Body,
                Requester = mail.Sender,
                Assignee = null,
                CreatedAt = mail.CreatedAt,
                UpdatedAt = mail.UpdatedAt,
                Subject = mail.Subject,
                Status = Ticket.STATUS_OPEN,
                Priority = Ticket.PRIORITY_NORMAL
            };
            ctx.Tickets.Add(newTicket);
            ctx.SaveChanges();
        }
    }
}
