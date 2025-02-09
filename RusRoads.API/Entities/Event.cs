namespace RusRoads.API.Entities;

public class Event : Base
{
    public required string Name {get; set;} 

    public required int EventTypeId {get; set;}
    public EventType? EventType {get; set;}
    
    public DateTime BeginDate {get; set;}
    public DateTime EndDate {get; set;}

    public required string Status { get; set; }

    public required string ResponsiblesPerson { get; set; }

    public required string Description {get; set;}

    public IEnumerable<EventMaterial>? EventMaterials {get; set;}
    public IEnumerable<Applicant>? Applicants {get; set;}
}