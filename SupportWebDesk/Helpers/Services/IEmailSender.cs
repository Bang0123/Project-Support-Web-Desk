using System.Threading.Tasks;

namespace SupportWebDesk.Helpers.Services
{
    public interface IEmailSender
    {
        Task AutoReply(string email, string requester, int ticketId, string subject);
    }
}