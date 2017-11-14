using System.Threading.Tasks;

namespace SupportWebDesk.Helpers.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}