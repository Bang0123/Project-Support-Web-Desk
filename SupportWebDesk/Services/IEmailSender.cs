using System.Threading.Tasks;
using MimeKit;

namespace SupportWebDesk.Services
{
    public interface IEmailSender
    {
        Task AutoReply(string email, string requester, int ticketId, string subject);
        Task<bool> SendEmailAsync(MimeMessage message);
        string GetFormattedSubject(int ticketId, int msgId, string subject);
        string AttachSignature(string body, string signature);
        string Formatbody(string body);
    }
}