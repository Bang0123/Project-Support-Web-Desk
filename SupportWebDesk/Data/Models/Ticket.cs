using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;

namespace SupportWebDesk.Data.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public String Subject { get; set; }
        public String Body { get; set; }
        public String Sender { get; set; }
        public String messageId { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Note> Notes { get; set; }
        public ICollection<Reply> Replies { get; set; }
    }
}
