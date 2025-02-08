namespace RusRoads.API.Entities;

public record Position(int Id, string Name){
    public IEnumerable<Employee>? Employees {get; set;}
}; 

