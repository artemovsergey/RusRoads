namespace RusRoads.API.Entities;

public record EventType(int Id, string Name){
    public IEnumerable<Event>? Events {get; set;}
};
