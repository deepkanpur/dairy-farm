using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<DairyFarm> DairyFarms { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public DbSet<Revenue> Revenues { get; set; }
        public DbSet<SaleRegister> SaleRegister { get; set; }
        public DbSet<ExpenseTypeMaster> ExpenseTypes { get; set; }
        public DbSet<ExpenseRegister> Expenses { get; set; }
        public DbSet<Salary> Salaries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Comment>()
                .HasOne(u => u.DairyFarm)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}