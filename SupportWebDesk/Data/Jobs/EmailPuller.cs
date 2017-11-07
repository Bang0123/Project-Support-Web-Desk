using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SupportWebDesk.Data;
using SupportWebDesk.Helpers;

namespace SupportWebDesk.Data.Jobs
{
    public class EmailPuller
    {
        public static IMailRepository MailRepo { get; set; }

        public static void Fire()
        {
            MailRepo = InitMailRepo("smtp.gmail.com", 443, true, "login", "pass");

        }

        public static IMailRepository InitMailRepo(string mailServer, int port, bool ssl, string login, string password)
        {
            return new MailRepository(mailServer, port, ssl, login, password);
        }
    }
}
