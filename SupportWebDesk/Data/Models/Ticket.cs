using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using SupportWebDesk.Auth;

namespace SupportWebDesk.Data.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public String Subject { get; set; }
        public String Body { get; set; }
        public User Author { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Note> Notes { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
