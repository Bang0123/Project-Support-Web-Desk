using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using SupportWebDesk.Auth;
using SupportWebDesk.Data.Models;
using SupportWebDesk.Helpers.Services;

namespace SupportWebDesk.Data
{
    /// <summary>
    /// db seeder class
    /// </summary>
    public class DbInitializer : IDbInitializer
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private static Random random = new Random();

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="userManager"></param>
        /// <param name="roleManager"></param>
        public DbInitializer(
            UserManager<User> userManager,
            RoleManager<Role> roleManager
            )
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        /// <summary>
        /// initializes and seeds the db
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task Initialize(WebDeskContext context)
        {
            context.Database.EnsureCreated();
            await SeedUsers(context);
            await SeedMails(context);
            await SeedTickets(context);

        }
        private static string RandomString(int length)
        {
            const string chars = "abcdefghijlkmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private async Task SeedMails(WebDeskContext context)
        {
            if (context.Mails.Any())
            {
                return; // Db has been seeded.
            }
            var mails = new List<Mail>()
            {
                new Mail(){Body = RandomString(4), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, MessageId = RandomString(6), Sender = "admin@gmail.com", Subject = RandomString(6), TicketCreated = false},
                new Mail(){Body = RandomString(4), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, MessageId = RandomString(6), Sender = "admin@gmail.com", Subject = RandomString(9), TicketCreated = false},
                new Mail(){Body = RandomString(6), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, MessageId = RandomString(6), Sender = "admin@gmail.com", Subject = RandomString(12), TicketCreated = false},
                new Mail(){Body = RandomString(8), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, MessageId = RandomString(6), Sender = "admin@gmail.com", Subject = RandomString(16), TicketCreated = false},
                new Mail(){Body = RandomString(10), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, MessageId = RandomString(6), Sender = "admin@gmail.com", Subject = RandomString(25), TicketCreated = false},
            };
            await context.Mails.AddRangeAsync(mails);
            await context.SaveChangesAsync();
        }

        private async Task SeedTickets(WebDeskContext context)
        {
            var prio = new[] { "Kritisk", "Høj", "Normal", "lav" };
            var stat = new[] { "Åben", "Igang", "Lukket" };
            var user = context.Users.First();
            if (context.Tickets.Any())
            {
                return; // Db has been seeded.
            }
            var tickets = new List<Ticket>()
            {
                new Ticket(){ Assignee = user,Requester = user, Body = RandomString(10), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, Subject = RandomString(6), Priority = prio[random.Next(0, prio.Length-1)], Status = stat[random.Next(0, stat.Length-1)]},
                new Ticket(){Assignee = user,Requester = user, Body = RandomString(10), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, Subject = RandomString(6),
                    Priority = prio[random.Next(0, prio.Length-1)],Status = stat[random.Next(0, stat.Length-1)]},
                new Ticket(){ Assignee = user,Requester = user, Body = RandomString(10), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, Subject = RandomString(6),Priority = prio[random.Next(0, prio.Length-1)], Status = stat[random.Next(0, stat.Length-1)]},
                new Ticket(){ Assignee = user,Requester = user, Body = RandomString(10), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, Subject = RandomString(6),Priority = prio[random.Next(0, prio.Length-1)], Status = stat[random.Next(0, stat.Length-1)]},
                new Ticket(){ Assignee = user,Requester = user, Body = RandomString(10), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, Subject = RandomString(6),Priority = prio[random.Next(0, prio.Length-1)], Status = stat[random.Next(0, stat.Length-1)]},
                new Ticket(){ Assignee = user, Requester = user, Body = RandomString(10), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, Subject = RandomString(6),Priority = prio[random.Next(0, prio.Length-1)], Status = stat[random.Next(0, stat.Length-1)]},
            };
            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        }

        private async Task SeedUsers(WebDeskContext context)
        {
            if (context.Users.Any())
            {
                return; // Db has been seeded.
            }

            // Creates Roles.
            await _roleManager.CreateAsync(new Role("administrator"));
            await _roleManager.CreateAsync(new Role("user"));

            // Seeds an admin user.
            var user = new User
            {
                FirstName = "Admin",
                LastName = "Admin",
                AccessFailedCount = 0,
                Email = "admin@gmail.com",
                EmailConfirmed = false,
                LockoutEnabled = false,
                NormalizedEmail = "ADMIN@GMAIL.COM",
                NormalizedUserName = "ADMIN@GMAIL.COM",
                TwoFactorEnabled = false,
                UserName = "admin@gmail.com"
            };

            var result = await _userManager.CreateAsync(user, "Admin01*");

            if (result.Succeeded)
            {
                var adminUser = await _userManager.FindByNameAsync(user.UserName);
                // Assigns the administrator role.
                await _userManager.AddToRoleAsync(adminUser, "administrator");
                // Assigns claims.
                var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.GivenName, value: user.FirstName),
                    new Claim(type: JwtClaimTypes.FamilyName, value: user.LastName),
                };
                await _userManager.AddClaimsAsync(adminUser, claims);
            }
        }
    }
}
