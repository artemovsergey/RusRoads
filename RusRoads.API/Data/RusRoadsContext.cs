using Microsoft.EntityFrameworkCore;
using RusRoads.API.Entities;

namespace RusRoads.API.Data;

public class RusRoadsContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Employee> Employees { get; set; }
    // public DbSet<Position> Positions { get; set; }
    public DbSet<Subdivision> Subdivisions { get; set; }

    public DbSet<Applicant> Applicants { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<EventType> EventTypes { get; set; }

    public DbSet<Material> Materials { get; set; }

    public DbSet<EventMaterial> EventMaterials { get; set; }

    public DbSet<WorkingCalendar> WorkingCalendars { get; set; }


    public RusRoadsContext(DbContextOptions options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        string checkConstraintSql = "ALTER TABLE \"Products\" ADD CONSTRAINT \"ck_product_price\" CHECK (\"Price\" > 0);";

        modelBuilder.Entity<User>().HasCheckConstraint("ck_product_price", checkConstraintSql);

        modelBuilder
        .Entity<User>()
        .ToTable(b => b.HasCheckConstraint("CK_Blog_TooFewBits", "Id > 1023"));

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Login)
            .IsUnique();
               

        // Ограничение длины строки
        modelBuilder.Entity<Employee>()
            .Property(e => e.Email)
            .HasMaxLength(255);
    }

}