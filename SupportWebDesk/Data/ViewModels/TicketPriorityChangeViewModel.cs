using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SupportWebDesk.Data.ViewModels
{
    public class TicketPriorityChangeViewModel
    {
        [Required(ErrorMessage = "Ticket Id required")]
        [Range(0, Int32.MaxValue, ErrorMessage = "Number must be a positive integer")]
        public int TicketId { get; set; }
        [Required(ErrorMessage = "Priority required")]
        public string Priority { get; set; }
    }
}
