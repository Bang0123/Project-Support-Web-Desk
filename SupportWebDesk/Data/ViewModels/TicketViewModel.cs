using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SupportWebDesk.Auth;
using SupportWebDesk.Data.Models;

namespace SupportWebDesk.Data.ViewModels
{
    public class TicketViewModel
    {
        public int Id { get; set; }
        public String Subject { get; set; }
        public String Body { get; set; }
        public String Status { get; set; }
        public String Priority { get; set; }
        public string Requester { get; set; }
        public UserViewModel Assignee { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Note> Notes { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
