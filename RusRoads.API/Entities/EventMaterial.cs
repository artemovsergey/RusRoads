namespace RusRoads.API.Entities;
public class EventMaterial(){
    public int Id {get; set;}
    
    public int EventId {get; set;}
    public Event? Event {get; set;}

    public int MaterialId {get; set;}
    public Material? Material {get; set;}
}