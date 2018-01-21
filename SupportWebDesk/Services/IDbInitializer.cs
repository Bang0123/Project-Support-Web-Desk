using System.Threading.Tasks;
using SupportWebDesk.Data;

namespace SupportWebDesk.Services
{
    public interface IDbInitializer
    {
        Task Initialize(WebDeskContext context);
    }
}