using System.ComponentModel.DataAnnotations.Schema;

namespace RusRoads.API.Entities;

public class Material : Base
{
    public required string Name { get; set; }
    public required DateTime ApprovalDate {get; set;} = DateTime.Now;
    public required DateTime ModifireDate {get; set;} = DateTime.Now;

    public required string Status {get; set;}
    public required string Type {get; set;}
    public required string Area {get; set;}

    public int AutorId {get; set;}
    [ForeignKey("AutorId")] 
    public required Employee Autor {get; set;}
    public IEnumerable<EventMaterial>? EventMaterials {get; set;}
}