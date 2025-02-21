
using RusRoads.API.Entities;

namespace RusRoads.API.Dtos;

public class EmployeeDto
{
    public int Id {get; set;}
    public string Fio {get; set;} = string.Empty;
    public Subdivision Subdivision {get; set;}
    public string Phone {get; set;}
    public string Cabinet {get; set;}
    public string Position {get; set;}
    public string Email {get; set;}
}