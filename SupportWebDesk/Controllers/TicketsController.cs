using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SupportWebDesk.Auth;
using SupportWebDesk.Data;
using SupportWebDesk.Data.Models;
using SupportWebDesk.Data.ViewModels;

namespace SupportWebDesk.Controllers
{
    [Produces("application/json")]
    [Route("api/Tickets")]
    // Authorization policy for this API.
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = Config.POLICY_USER)]
    public class TicketsController : Controller
    {
        private readonly WebDeskContext _context;

        public TicketsController(WebDeskContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Tickets
        /// Returns all tickets
        /// sorted by updatedat dsc
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IList<TicketViewModel> GetTickets()
        {
            var ticks = _context.Tickets
                .Include(ticket => ticket.Assignee)
                // .Include(x=>x.Messages)
                .OrderByDescending(x => x.UpdatedAt);
            var allTickets = new List<TicketViewModel>();
            foreach (var ticket in ticks)
            {
                var newAssignee = new UserViewModel()
                {
                    Email = ticket.Assignee?.Email,
                    UserName = ticket.Assignee?.UserName

                };
                var newTicket = new TicketViewModel()
                {
                    Assignee = newAssignee,
                    Body = ticket.Body,
                    Requester = ticket.Requester,
                    Id = ticket.Id,
                    Subject = ticket.Subject,
                    CreatedAt = ticket.CreatedAt,
                    Priority = ticket.Priority,
                    UpdatedAt = ticket.UpdatedAt,
                    Status = ticket.Status,
                    Messages = ticket.Messages,
                };
                allTickets.Add(newTicket);
            }
            return allTickets;
        }
        /// <summary>
        /// GET: api/Tickets/openamount
        /// </summary>
        /// <returns>Returns amount of tickets that are open</returns>
        [HttpGet("openamount")]
        public async Task<IActionResult> GetOpenTicketsAmount()
        {
            var amount = await _context.Tickets.CountAsync(ticket => ticket.Status == Ticket.STATUS_OPEN);
            return Ok(amount);
        }

        /// <summary>
        /// GET: api/Tickets/criticalamount
        /// </summary>
        /// <returns>Returns amount of tickets that are critical</returns>
        [HttpGet("criticalamount")]
        public async Task<IActionResult> GetCriticalTicketAmount()
        {
            var amount = await _context.Tickets.CountAsync(ticket => ticket.Priority == Ticket.PRIORITY_CRITICAL);
            return Ok(amount);
        }

        /// <summary>
        /// GET: api/Tickets/newamount
        /// </summary>
        /// <returns>Returns amount of tickets that are new</returns>
        [HttpGet("newamount")]
        public async Task<IActionResult> GetNewAmountOfTickets()
        {
            var amount = await _context.Tickets.CountAsync(
                ticket => DateTime.Now.Subtract(ticket.CreatedAt).Days <= Ticket.TICKET_15_DAYS_OLD
                );
            return Ok(amount);
        }

        /// <summary>
        /// GET: api/Tickets/assigneeamount/{username}
        /// </summary>
        /// <returns>Returns amount of tickets that are assigned to the "user"</returns>
        [HttpGet("assigneeamount/{username}")]
        public async Task<IActionResult> GetAssigneeTicketAmount([FromRoute] string username)
        {
            var amount = await _context.Tickets.CountAsync(
                ticket => ticket.Assignee.UserName == username && ticket.Status != Ticket.STATUS_CLOSED
            );
            return Ok(amount);
        }

        /// <summary>
        /// GET: api/Tickets/assignee/{username}
        /// </summary>
        /// <returns>Returns all tickets, sorted by updatedat dsc</returns>
        [HttpGet("assignee/{username}")]
        public IList<TicketViewModel> GetAssigneesTickets([FromRoute] string username)
        {
            var ticks = _context.Tickets
                .Include(ticket => ticket.Assignee)
                .Include(ticket => ticket.Messages)
                .Where(ticket => ticket.Assignee.UserName == username && ticket.Status != Ticket.STATUS_CLOSED)
                .OrderByDescending(ticket => ticket.UpdatedAt);

            var allTickets = new List<TicketViewModel>();
            foreach (var ticket in ticks)
            {
                var newAssignee = new UserViewModel()
                {
                    Email = ticket.Assignee?.Email,
                    UserName = ticket.Assignee?.UserName
                };
                var newTicket = new TicketViewModel()
                {
                    Assignee = newAssignee,
                    Body = ticket.Body,
                    Requester = ticket.Requester,
                    Id = ticket.Id,
                    Subject = ticket.Subject,
                    CreatedAt = ticket.CreatedAt,
                    Priority = ticket.Priority,
                    UpdatedAt = ticket.UpdatedAt,
                    Status = ticket.Status,
                    Messages = ticket.Messages,
                };
                allTickets.Add(newTicket);
            }
            return allTickets;
        }

        /// <summary>
        /// GET: api/Tickets/messages/{id}
        /// </summary>
        /// <returns>Returns all ticket messages for an id, sorted by updatedat dsc</returns>
        [HttpGet("messages/{id}")]
        public async Task<IActionResult> GetTicketMessages([FromRoute] int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return BadRequest(new { Error = "Ticket id doesnt exist" });
            }
            var messages = _context.Messages.Where(m => m.TicketId == id).OrderByDescending(msg => msg.UpdatedAt);
            return Ok(messages);
        }


        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ticket = await _context.Tickets.SingleOrDefaultAsync(m => m.Id == id);

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        // PUT: api/Tickets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket([FromRoute] int id, [FromBody] Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticket.Id)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tickets
        [HttpPost]
        public async Task<IActionResult> PostTicket([FromBody] Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ticket = await _context.Tickets.SingleOrDefaultAsync(m => m.Id == id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return Ok(ticket);
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }
    }
}