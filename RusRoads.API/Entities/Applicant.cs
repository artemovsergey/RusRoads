namespace RusRoads.API.Entities;

public class Applicant : Base
{
    // дата поступления
    public DateTime ReceiptDateResume {get; set;} = DateTime.Now;

    // направление
    public string? Direction {get; set;}

    public byte[]? ResumeFile {get; set;}

    public int? EventId {get; set;}
    public Event? Event {get; set;}
}