using System.ComponentModel.DataAnnotations.Schema;

namespace RusRoads.API.Entities;

public class Subdivision : Base
{
    public required string Name {get; set;}
    public string Description {get; set;} = string.Empty;

}