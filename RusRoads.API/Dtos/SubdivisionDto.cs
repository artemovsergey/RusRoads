
using RusRoads.API.Entities;

namespace RusRoads.API.Dtos;

public class SubdivisionDto
{
    public int Id {get; set;}
    public string Name {get; set;} = string.Empty;
    public int HeadSubdivisionId {get; set;}
}

