using System.Collections.Generic;
using MimeKit;

namespace SupportWebDesk.Helpers
{
    public interface IMailRepository
    {
        IEnumerable<MimeMessage> GetAllMails(bool markAsRead = false);
        IEnumerable<MimeMessage> GetUnreadMails(bool markAsRead = false);
    }
}