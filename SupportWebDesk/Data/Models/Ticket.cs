using System;
using System.Collections.Generic;
using SupportWebDesk.Auth;

namespace SupportWebDesk.Data.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public String Subject { get; set; }
        public String Body { get; set; }
        public String Status { get; set; }
        public String Priority { get; set; }
        public User Requester { get; set; }
        public User Assignee { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Note> Notes { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
