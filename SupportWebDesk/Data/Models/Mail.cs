using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SupportWebDesk.Data.Models
{
    public class Mail
    {
        public int ID { get; set; }
        public String Subject { get; set; }
        public String Body { get; set; }
        public String Sender { get; set; }
        public String Receiver { get; set; }
    }
}
