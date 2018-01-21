using System.Collections.Generic;
using System.Threading.Tasks;
using MimeKit;

namespace SupportWebDesk.Helpers
{
    public interface IMailRepository
    {
        Task<IEnumerable<MimeMessage>> GetUnreadMailsAsync(bool markAsRead = false);
    }
}