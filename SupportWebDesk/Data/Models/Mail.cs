using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SupportWebDesk.Data.Models
{
    public class Mail
    {
        public int Id { get; set; }
        public String Subject { get; set; }
        public String Body { get; set; }
        public String Sender { get; set; }
        public String SenderEmail { get; set; }
        public String MessageId { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Processed { get; set; }
    }
}
