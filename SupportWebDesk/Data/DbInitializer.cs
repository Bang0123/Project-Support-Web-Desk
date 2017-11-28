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
        private string[] senders = { "Anders@gmail.com", "Torben@gmail.com", "Rasmus@gmail.com", "bro@gmail.com", "hans@gmail.com" };

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
            var mails = CreateMails(12);
            await context.Mails.AddRangeAsync(mails);
            await context.SaveChangesAsync();
        }

        private List<Mail> CreateMails(int amount)
        {
            var mails = new List<Mail>();
            for (int i = 0; i < amount; i++)
            {
                mails.Add(
                    new Mail() { Body = RandomString(10), CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, MessageId = RandomString(6), Sender = senders[random.Next(0, senders.Length - 1)], Subject = RandomString(25), Processed = false });
            }
            return mails;
        }

        private async Task SeedTickets(WebDeskContext context)
        {
            if (context.Tickets.Any())
            {
                return; // Db has been seeded.
            }
            var tickets = CreateTickets(12, context);
            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        }

        private List<Ticket> CreateTickets(int amount, WebDeskContext ctx)
        {
            var user = ctx.Users.ToList();
            var prio = new[] { Ticket.PRIORITY_CRITICAL, Ticket.PRIORITY_HIGH, Ticket.PRIORITY_NORMAL, Ticket.PRIORITY_LOW };
            var stat = new[] { Ticket.STATUS_OPEN, Ticket.STATUS_ONGOING, Ticket.STATUS_CLOSED };
            var tickets = new List<Ticket>();
            for (int i = 0; i < amount; i++)
            {
                tickets.Add(
                    new Ticket()
                    {
                        Assignee = user[random.Next(0, user.Count() - 1)],
                        Requester = senders[random.Next(0, senders.Length - 1)],
                        Body = RandomString(10),
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Subject = RandomString(6),
                        Priority = prio[random.Next(0, prio.Length - 1)],
                        Status = stat[random.Next(0, stat.Length - 1)]
                    });
            }
            return tickets;
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

            var bruger = new User
            {
                FirstName = "Bruger",
                LastName = "Bruger",
                AccessFailedCount = 0,
                Email = "Bruger@gmail.com",
                EmailConfirmed = false,
                LockoutEnabled = false,
                NormalizedEmail = "BRUGER@GMAIL.COM",
                NormalizedUserName = "BRUGER@GMAIL.COM",
                TwoFactorEnabled = false,
                UserName = "Bruger@gmail.com"
            };

            var resulte = await _userManager.CreateAsync(bruger, "Bruger01*");

            if (resulte.Succeeded)
            {
                var brugerUser = await _userManager.FindByNameAsync(bruger.UserName);
                // Assigns the administrator role.
                await _userManager.AddToRoleAsync(brugerUser, "user");
                // Assigns claims.
                var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.GivenName, value: bruger.FirstName),
                    new Claim(type: JwtClaimTypes.FamilyName, value: bruger.LastName),
                };
                await _userManager.AddClaimsAsync(brugerUser, claims);
            }
        }
    }
}
