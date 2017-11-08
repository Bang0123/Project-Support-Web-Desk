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
        public void GetMailsAndSaveToDb()
        {

            _mailRepo = InitMailRepo("imap.gmail.com", 993, true, "webdesk1234@gmail.com", "supportweb");
            var mails = _mailRepo.GetUnreadMails();
            var newMails = new List<Mail>();
            foreach (var message in mails)
            {
                var mail = new Mail
                {
                    Subject = message.Subject,
                    Body = message.HtmlBody ?? message.TextBody,
                    Sender = message.Sender == null ? null : message.Sender.Name + "," + message.Sender.Address,
                    messageId = message.MessageId,
                    Date = message.Date == null ? DateTime.Now : message.Date.DateTime
                };

                newMails.Add(mail);
            }
            _db.Mails.AddRangeAsync(newMails);
            _db.SaveChangesAsync();

        }

        public IMailRepository InitMailRepo(string mailServer, int port, bool ssl, string login, string password)
        {
            return new MailRepository(mailServer, port, ssl, login, password);
        }
    }
}
