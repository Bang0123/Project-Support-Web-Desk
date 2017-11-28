using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SupportWebDesk.Auth;

namespace SupportWebDesk.Data.Models
{
    public class Message
    {
        public String Body { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public User Author { get; set; }
        public string Sender { get; set; }
        public int Id { get; set; }
        public int? TicketId { get; set; }
    }
}
