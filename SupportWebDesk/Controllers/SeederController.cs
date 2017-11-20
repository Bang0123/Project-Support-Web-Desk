using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MimeKit.Cryptography;
using SupportWebDesk.Data;
using SupportWebDesk.Helpers.Services;

namespace SupportWebDesk.Controllers
{
    [Produces("application/json")]
    [Route("api/Seeder")]
    public class SeederController : Controller
    {
        private readonly WebDeskContext _context;
        private readonly IDbInitializer _dbInitializer;

        public SeederController(WebDeskContext context, IDbInitializer dbInitializer)
        {
            _context = context;
            _dbInitializer = dbInitializer;
        }

        // GET: api/Seeder
        [HttpGet]
        public async Task<string> Get()
        {
            await _dbInitializer.Initialize(_context);
            return "Db initialized.";
        }

        
    }
}
