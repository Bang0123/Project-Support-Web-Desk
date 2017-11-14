using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using SupportWebDesk.Auth;
using SupportWebDesk.Helpers.Services;

namespace SupportWebDesk.Data
{
    public class DbInitializer : IDbInitializer
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public DbInitializer(
            UserManager<User> userManager,
            RoleManager<Role> roleManager
            )
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        public async Task Initialize(WebDeskContext context)
        {
            context.Database.EnsureCreated();

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
