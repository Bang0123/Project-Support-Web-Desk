using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;
using SupportWebDesk.Data;
using SupportWebDesk.Data.Models;

namespace SupportWebDesk.Helpers.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfigurationSection _mailLogin;
        private readonly IConfigurationSection _mailServer;
        private readonly WebDeskContext _ctx;
        private readonly ILogger _logger;
        public EmailSender(WebDeskContext context, ILoggerFactory logger)
        {
            _ctx = context;
            _logger = logger.CreateLogger(typeof(EmailSender));
            _mailLogin = Config.Appsettings.GetSection("EmailLogin");
            _mailServer = Config.Appsettings.GetSection("MailSmtp");
        }

        public async Task AutoReply(string email, string requester, int ticketId, string subject)
        {
            var message = new MimeMessage();
            message.From.Add(address: new MailboxAddress(name: "Support Web Desk", address: _mailLogin[key: "username"]));
            message.To.Add(address: new MailboxAddress(name: requester, address: email));
            var builder = new BodyBuilder();
            var txtbody = GetAutoReplyBody(requester: requester, html: false);
            builder.TextBody = txtbody;
            builder.HtmlBody = GetAutoReplyBody(requester: requester, html: true);
            message.Body = builder.ToMessageBody();
            var msg = new Message()
            {
                Author = null,
                Body = txtbody,
                CreatedAt = DateTime.Now,
                Sender = "System",
                SenderEmail = _mailLogin[key: "username"],
                UpdatedAt = DateTime.Now,
                TicketId = ticketId
            };
            await _ctx.Messages.AddAsync(entity: msg);
            await _ctx.SaveChangesAsync();
            message.Subject = GetFormattedSubject(ticketId: ticketId, msgId: msg.Id, subject: subject);
            if (await SendEmailAsync(message: message))
            {
                await _ctx.SaveChangesAsync();
            }
            else
            {
                _logger.LogCritical(eventId: (int)LogEvent.Failure, message: "Cant send email through current smtp");
                _ctx.Messages.Remove(entity: msg);
                await _ctx.SaveChangesAsync();
            }
        }

        public string AttachSignature(string body, string signature)
        {
            return $"{body}\r\n\r\n{signature}";
        }

        public string Formatbody(string body)
        {
            try
            {
                return body.Replace("\r\n", "\r\n\r\n");
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
                    await emailClient.ConnectAsync(_mailServer["server"], Convert.ToInt32(_mailServer["port"]), SecureSocketOptions.StartTls);
                    emailClient.AuthenticationMechanisms.Remove("XOAUTH2");
                    await emailClient.AuthenticateAsync(_mailLogin["username"], _mailLogin["password"]);
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
