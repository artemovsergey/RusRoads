namespace RusRoads.API.Entities;

public class User : Base
{
    public required string Login {get; set;}
    public required string Password {get; set;}
    public Employee? Employee {get; set;}
    public int EmployeeId {get ;set;}
}