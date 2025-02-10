namespace RusRoads.API.Entities;

public abstract class Base
{
    public int Id {get; set;}
    public DateTime DateСreated {get; set;} = DateTime.UtcNow;
    public DateTime DateUpdated {get; set;} = DateTime.UtcNow;
}