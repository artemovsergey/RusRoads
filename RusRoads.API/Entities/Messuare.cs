using System.ComponentModel.DataAnnotations.Schema;

namespace RusRoads.API.Entities;

public class Messuare : Base
{
    public required string Title {get; set;}
    public required string Description {get; set;} 
    public required DateTime Date {get; set;}
    public required string? Status {get; set;}

    // в качестве ответственных лиц выступает автор мероприятия
    public int? AutorId  {get; set;}
    
    [ForeignKey("AutorId")]
    public Employee? Author { get; set; }

    
}