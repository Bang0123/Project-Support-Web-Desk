using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    // [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
    public class TicketsController : Controller
    {
        private readonly WebDeskContext _context;

        public TicketsController(WebDeskContext context)
        {
            _context = context;
        }

        // GET: api/Tickets
        [HttpGet]
        public IList<TicketViewModel> GetTickets()
        {
            var ticks = _context.Tickets
                .Include(ticket => ticket.Assignee)
                .Include(ticket => ticket.Requester)
                .OrderByDescending(x=>x.UpdatedAt);
            var allTickets = new List<TicketViewModel>();
            foreach (var ticket in ticks)
            {
                var newAssignee = new UserViewModel() { Email = ticket.Assignee.Email, UserName = ticket.Assignee.UserName };
                var newRequester = new UserViewModel(){ Email = ticket.Requester.Email, UserName = ticket.Requester.UserName};
                var newTicket = new TicketViewModel(){Assignee = newAssignee, Body = ticket.Body, Requester = newRequester, Id = ticket.Id, Subject = ticket.Subject, CreatedAt = ticket.CreatedAt, Priority = ticket.Priority, UpdatedAt = ticket.UpdatedAt, Status = ticket.Status, Messages = ticket.Messages, Notes = ticket.Notes};
                allTickets.Add(newTicket);
            }
            return allTickets;
        }
        // GET: api/Tickets/openamount
        [HttpGet("openamount")]
        public async Task<IActionResult> GetOpenTicketsAmount()
        {
            var amount = await _context.Tickets.CountAsync(x => x.Status == "Åben");
            return Ok(amount);
        }
        // GET: api/Tickets/criticalamount
        [HttpGet("criticalamount")]
        public async Task<IActionResult> GetCriticalTicketAmount()
        {
            var amount = await _context.Tickets.CountAsync(x => x.Priority == "Kritisk");
            return Ok(amount);
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