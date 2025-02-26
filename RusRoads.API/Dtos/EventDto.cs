using RusRoads.API.Entities;

public class EventDto : Base
{
    public required int EventTypeId {get; set;}
    public DateTime BeginDate {get; set;}
    public DateTime EndDate {get; set;}
    public string? Description {get; set;}
    public int EmployeeId {get; set;}
}