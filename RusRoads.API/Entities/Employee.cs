using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RusRoads.API.Entities;

public class Employee : Base
{
    public required string Fio { get; set; }

    public required int SubdivisionId { get; set; }
    public Subdivision? Subdivision { get; set; }

    public DateTime Birthday {get; set;}
    public required string Position {get ;set;}


    public int? HeadId {get; set;}
    [ForeignKey("HeadId")]
    public Employee? Head {get; set;}


    public int? HelperId {get; set;}
    [ForeignKey("HelperId")]
    public Employee? Helper {get; set;}

    public required string JobPhone {get; set;}

    [RegularExpression(@"^[0-9+() -]{1,20}$", ErrorMessage = "Invalid phone number format.")]
    public required string Phone {get; set;}
    public required string Cabinet {get; set;}
    public required string Email {get; set;}

    public int? ManagedId { get; set; }
    
    [ForeignKey("ManagedId")]
    public Subdivision? ManagedSubdivision { get; set; }
    public IEnumerable<Event>? Events {get; set;}
    public DateTime? DismissDate {get ;set;} = null;

}