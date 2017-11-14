using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SupportWebDesk.Auth;
using SupportWebDesk.Data.Models;

namespace SupportWebDesk.Data
{
    public class WebDeskContext : IdentityDbContext<User, Role, string>
    {
        public WebDeskContext(DbContextOptions<WebDeskContext> options) : base(options)
        {

        }

        public DbSet<Mail> Mails { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Mail>().ToTable("Mails");
            modelBuilder.Entity<Ticket>().ToTable("Tickets");
            modelBuilder.Entity<Note>().ToTable("Notes");
            modelBuilder.Entity<Message>().ToTable("Messages");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
