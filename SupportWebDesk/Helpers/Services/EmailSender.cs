using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Utils;
using SupportWebDesk.Data;
using SupportWebDesk.Data.Models;

namespace SupportWebDesk.Helpers.Services
{
    public class EmailSender : IEmailSender
    {
        private WebDeskContext ctx;
        public EmailSender(WebDeskContext context)
        {
            ctx = context;
        }
        public async Task AutoReply(string email, string requester, int ticketId, string subject)
        {
            var mailServer = Config.Appsettings.GetSection("MailSmtp");
            var mailLogin = Config.Appsettings.GetSection("EmailLogin");
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Support Web Desk", mailLogin["username"]));
            message.To.Add(new MailboxAddress(requester, email));
            var builder = new BodyBuilder();
            var txtbody =  $@"Hey {requester},

We have received your mail. It is now registered in the system.

Help will be here soon tm.

Support Web Desk
";

            builder.TextBody = txtbody;
            builder.HtmlBody = $@"<p>Hey {requester},<br>
<p>We have received your mail. It is now registered in the system.<br>
<p>Help will be here soon tm.<br>
<p>Support Web Desk<br>";

            message.Body = builder.ToMessageBody();
            var ticket = await ctx.Tickets.FindAsync(ticketId);
            ticket.Messages.Add(new Message()
            {
                Author = null,
                Body = txtbody,
                CreatedAt = DateTime.Now,
                Sender = "System",
                SenderEmail = mailLogin["username"],
                UpdatedAt = DateTime.Now,
                TicketId = ticket.Id
            });
            var msgId = ticket.Messages.First().Id;
            message.Subject = $"T: {ticket.Id} M: {msgId} | {ticket.Subject}";

            using (var emailClient = new SmtpClient())
            {
                emailClient.Connect(mailServer["server"], Convert.ToInt32(mailServer["port"]), SecureSocketOptions.StartTls);
                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");

                emailClient.Authenticate(mailLogin["username"], mailLogin["password"]);

                emailClient.Send(message);

                emailClient.Disconnect(true);
            }
            ctx.SaveChanges();
        }
    }
}
