using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SupportWebDesk.Data;
using SupportWebDesk.Data.Models;
using SupportWebDesk.Helpers;

namespace SupportWebDesk.Data.Jobs
{
    public class EmailPullerJob
    {
        private IMailRepository _mailRepo;

        private WebDeskContext _db;

        public EmailPullerJob(WebDeskContext dbContext)
        {
            _db = dbContext;
        }
        public void GetMailsAndSaveToDb(bool markAsRead = false)
        {
            var loginDetails = Startup.Appsettings.GetSection("EmailLogin");
            _mailRepo = InitMailRepo("imap.gmail.com", 993, true, loginDetails["username"], loginDetails["password"]);
            var mails = _mailRepo.GetUnreadMails(markAsRead: markAsRead);
            var newMails = new List<Mail>();
            foreach (var message in mails)
            {
                var mail = new Mail
                {
                    Subject = message.Subject,
                    Body = message.HtmlBody ?? message.TextBody,
                    Sender = message.Sender == null ? null : message.Sender.Name + "," + message.Sender.Address,
                    MessageId = message.MessageId,
                    Date = message.Date == null ? DateTime.Now : message.Date.DateTime,
                    TicketCreated = false
                };
                newMails.Add(mail);
            }
            _db.Mails.AddRange(newMails);
            _db.SaveChanges();
        }

        public IMailRepository InitMailRepo(string mailServer, int port, bool ssl, string login, string password)
        {
            return new MailRepository(mailServer, port, ssl, login, password);
        }
    }
}
