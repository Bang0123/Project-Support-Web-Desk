using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Utils;
using SupportWebDesk.Data;
using SupportWebDesk.Data.Models;

namespace SupportWebDesk.Helpers.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfigurationSection mailLogin;
        private readonly IConfigurationSection mailServer;
        private readonly WebDeskContext ctx;
        public EmailSender(WebDeskContext context)
        {
            ctx = context;
            mailLogin = Config.Appsettings.GetSection("EmailLogin");
            mailServer = Config.Appsettings.GetSection("MailSmtp");
        }

        public async Task AutoReply(string email, string requester, int ticketId, string subject)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Support Web Desk", mailLogin["username"]));
            message.To.Add(new MailboxAddress(requester, email));
            var builder = new BodyBuilder();
            var txtbody = GetAutoReplyBody(requester, false);
            builder.TextBody = txtbody;
            builder.HtmlBody = GetAutoReplyBody(requester, true);
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
            message.Subject = GetFormattedSubject(ticket.Id, msgId, ticket.Subject);
            if (await SendEmailAsync(message))
            {
                await ctx.SaveChangesAsync();
            }
        }

        public string AttachSignature(string body, string signature)
        {
            return $"{body}\n\n{signature}";
        }

        public string Formatbody(string body)
        {
            try
            {
                return body.Replace("\n", "\n\n");
            }
            catch (Exception)
            {
                return body;
            }
        }

        public string GetFormattedSubject(int ticketId, int msgId, string subject)
        {
            return $"T: {ticketId} M: {msgId} | {subject}";
        }

        private string GetAutoReplyBody(string requester, bool html = false)
        {
            if (!html)
            {
                var txtbody = $@"Hey {requester},

We have received your mail. It is now registered in the system.

Help will be here soon tm.

Support Web Desk";
                return txtbody;
            }
            else
            {
                var htmlBody = $@"<p>Hey {requester},<br>
<p>We have received your mail. It is now registered in the system.<br>
<p>Help will be here soon tm.<br>
<p>Support Web Desk<br>";
                return htmlBody;
            }
        }

        public async Task<bool> SendEmailAsync(MimeMessage message)
        {
            try
            {
                using (var emailClient = new SmtpClient())
                {
                    await emailClient.ConnectAsync(mailServer["server"], Convert.ToInt32(mailServer["port"]), SecureSocketOptions.StartTls);
                    emailClient.AuthenticationMechanisms.Remove("XOAUTH2");
                    await emailClient.AuthenticateAsync(mailLogin["username"], mailLogin["password"]);
                    await emailClient.SendAsync(message);
                    await emailClient.DisconnectAsync(true);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
