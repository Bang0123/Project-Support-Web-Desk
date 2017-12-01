using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using SupportWebDesk.Auth;
using SupportWebDesk.Data;
using SupportWebDesk.Data.Models;
using SupportWebDesk.Helpers.Services;

namespace SupportWebDesk.Controllers
{
    [Produces("application/json")]
    [Route("api/Messages")]
    // Authorization policy for this API.
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = Config.POLICY_USER)]
    public class MessagesController : Controller
    {
        private readonly WebDeskContext _context;
        private readonly IEmailSender _emailer;
        private readonly UserManager<User> _userManager;

        public MessagesController(
            WebDeskContext context,
            IEmailSender email,
        UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
            _emailer = email;
        }

        // GET: api/Messages
        [HttpGet]
        public IEnumerable<Message> GetMessages()
        {
            return _context.Messages;
        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var message = await _context.Messages.SingleOrDefaultAsync(m => m.Id == id);

            if (message == null)
            {
                return NotFound();
            }

            return Ok(message);
        }

        // PUT: api/Messages/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage([FromRoute] int id, [FromBody] Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != message.Id)
            {
                return BadRequest();
            }

            _context.Entry(message).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(id))
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

        // POST: api/Messages
        [HttpPost]
        public async Task<IActionResult> PostMessage([FromBody] Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            var ticket = await _context.Tickets.FindAsync(message.TicketId);
            ticket.Assignee = await _userManager.FindByNameAsync(message.Author);
            await _context.SaveChangesAsync();
            var mime = new MimeMessage();
            mime.From.Add(new MailboxAddress($"Support Web Desk: {ticket.Assignee.FirstName}", ticket.Assignee.Email));
            mime.To.Add(new MailboxAddress(ticket.Requester, ticket.RequesterMail));
            var builder = new BodyBuilder();
            var txtbody = _emailer.AttachSignature(_emailer.Formatbody(message.Body), ticket.Assignee.EmailSignature);
            builder.TextBody = txtbody;
            builder.HtmlBody = txtbody;
            mime.Body = builder.ToMessageBody();
            mime.Subject = _emailer.GetFormattedSubject(ticket.Id, message.Id, ticket.Subject);
            if (await _emailer.SendEmailAsync(mime))
            {
                return CreatedAtAction("GetMessage", new { id = message.Id }, message);
            }
            else
            {
                ticket.Assignee = null;
                _context.Messages.Remove(message);
                await _context.SaveChangesAsync();
                return BadRequest();
            }
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var message = await _context.Messages.SingleOrDefaultAsync(m => m.Id == id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }

        private bool MessageExists(int id)
        {
            return _context.Messages.Any(e => e.Id == id);
        }
    }
}