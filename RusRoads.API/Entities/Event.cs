namespace RusRoads.API.Entities;

public class Event : Base
{
    public required int EventTypeId {get; set;}
    public EventType? EventType {get; set;}
    public DateTime BeginDate {get; set;}
    public DateTime EndDate {get; set;}
    public string? Description {get; set;}

    public int EmployeeId {get; set;}
    public Employee? Employee {get; set;}
}