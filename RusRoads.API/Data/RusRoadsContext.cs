using Microsoft.EntityFrameworkCore;
using RusRoads.API.Entities;

namespace RusRoads.API.Data;

public class RusRoadsContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Subdivision> Subdivisions { get; set; }

    public DbSet<Applicant> Applicants { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Messuare> Messuares {get; set;}
    public DbSet<EventType> EventTypes { get; set; }

    public DbSet<Material> Materials { get; set; }

    public DbSet<EventMaterial> EventMaterials { get; set; }

    public DbSet<WorkingCalendar> WorkingCalendars { get; set; }

    public DbSet<Document> Documents { get; set; }
    public DbSet<Comment> Comments { get; set; }


    // public RusRoadsContext(DbContextOptions options) : base(options)
    // {

    // }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Name)
            .IsUnique();

        // Ограничение длины строки
        modelBuilder.Entity<Employee>()
            .Property(e => e.Email)
            .HasMaxLength(255);
    }

}