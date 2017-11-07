using System.Collections.Generic;

namespace SupportWebDesk.Helpers
{
    public interface IMailRepository
    {
        IEnumerable<string> GetAllMails(bool markAsRead = false);
        IEnumerable<string> GetUnreadMails(bool markAsRead = false);
        IEnumerable<string> GetUnreadMailsAndMarkAsRead();
    }
}