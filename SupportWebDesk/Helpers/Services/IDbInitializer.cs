using System.Threading.Tasks;
using SupportWebDesk.Data;

namespace SupportWebDesk.Helpers.Services
{
    public interface IDbInitializer
    {
        Task Initialize(WebDeskContext context);
    }
}