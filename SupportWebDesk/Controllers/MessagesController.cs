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
            if (ticket.Assignee == null)
            {
                ticket.Assignee = await _userManager.FindByNameAsync(message.Author);
            }
            var previous = ticket.Status;
            ticket.Status = Ticket.STATUS_ONGOING;
            ticket.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();
            if (message.IsNote)
            {
                return CreatedAtAction("PostMessage", new { id = message.Id }, message);
            }
            return await MailMessage(message, ticket, previous);
        }

        private async Task<IActionResult> MailMessage(Message message, Ticket ticket, string previousStatus)
        {
            var mime = new MimeMessage();
            mime.From.Add(new MailboxAddress($"Support Web Desk: {ticket.Assignee.FirstName}", ticket.Assignee.Email));
            mime.To.Add(new MailboxAddress(ticket.Requester, ticket.RequesterMail));
            var builder = new BodyBuilder();
            var txtbody = _emailer.AttachSignature(
                body: _emailer.Formatbody(body: message.Body),
                signature: ticket.Assignee.EmailSignature
                );
            builder.TextBody = txtbody;
            builder.HtmlBody = txtbody;
            mime.Body = builder.ToMessageBody();
            mime.Subject = _emailer.GetFormattedSubject(ticket.Id, message.Id, ticket.Subject);
            if (await _emailer.SendEmailAsync(mime))
            {
                return CreatedAtAction("PostMessage", new { id = message.Id }, message);
            }
            else
            {
                ticket.Assignee = null;
                _context.Messages.Remove(message);
                ticket.Status = previousStatus;
                await _context.SaveChangesAsync();
                return BadRequest(new { Error = "Couldnt send Email\nStatus remain 'Open'" });
            }
        }
    }
}