using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SupportWebDesk.Data.ViewModels
{
    public class TicketStatusChangeViewModel
    {
        public int TicketId { get; set; }
        public string Status { get; set; }
    }
}
