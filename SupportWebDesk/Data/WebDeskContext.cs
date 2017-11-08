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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Mail>().ToTable("Mail");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
