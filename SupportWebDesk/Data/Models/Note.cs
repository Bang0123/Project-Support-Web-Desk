using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SupportWebDesk.Auth;

namespace SupportWebDesk.Data.Models
{
    public class Note
    {
        public String Subject { get; set; }
        public String Body { get; set; }
        public String Sender { get; set; }
        public DateTime Date { get; set; }
        public User Author { get; set; }
        public int Id { get; set; }
        public int? TicketId { get; set; }
    }
}
