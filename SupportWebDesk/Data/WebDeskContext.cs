using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SupportWebDesk.Data.Models;

namespace SupportWebDesk.Data
{
    public class WebDeskContext : DbContext
    {
        public WebDeskContext(DbContextOptions<WebDeskContext> options) : base(options)
        {
            
        }

        public DbSet<Mail> Mails { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Reply> Replies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Mail>().ToTable("Mail");
            modelBuilder.Entity<Ticket>().ToTable("Ticket");
            modelBuilder.Entity<Note>().ToTable("Note");
            modelBuilder.Entity<Reply>().ToTable("Reply");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
