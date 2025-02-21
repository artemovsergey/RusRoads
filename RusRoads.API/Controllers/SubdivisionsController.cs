using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RusRoads.API.Data;
using RusRoads.API.Dtos;
using RusRoads.API.Entities;

namespace RusRoads.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubdivisionsController(RusRoadsContext db, IMapper mapper) : ControllerBase
{
    // crud

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Subdivision>>> GetSubdivisions()
    {

        // var divisionsDto = await db.Subdivisions.Select(division => new {
        //     Id = division.Id,
        //     Name = division.Name,
        //     Subdivision = new { Id = division.HeadSubdivisionId, Name = division.HeadSubdivision.Name}
        // }).ToListAsync();

        var divisions = db.Subdivisions.ToList();
        var divisionsDto = mapper.Map<IEnumerable<SubdivisionDto>>(divisions);

        return Ok(divisionsDto);
    }

    [HttpGet("{subdivisionId}/employees")]
    public IEnumerable<Employee> GetAll(int subdivisionId)
    {
        return db.Employees.Where(s => s.SubdivisionId == subdivisionId).ToList();
    }

    private IEnumerable<Employee> GetEmployees(int id)
    {
        return db.Employees.Where(s => s.SubdivisionId == id).ToList();
    }

    [HttpGet("{subdivisionId}/employeesAll")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmpBySubdivisions(int subdivisionId)
    {
        // Общий пулл сотрудников, который нужен
        var employeeAll = new List<Employee>(); 
        
        // Найти сотрудников самого подразделения
        var currentEmp = GetEmployees(subdivisionId);
        employeeAll.AddRange(currentEmp);

        // Найти все дочерние подразделения (рекурсивно)
        var allSubdivisions = await db.Subdivisions.ToListAsync();
        
        var result = new List<Subdivision>();
        
        void FindChildren(int parentId)
        {
            var children = allSubdivisions
                .Where(s => s.HeadSubdivisionId == parentId)
                .ToList();

            result.AddRange(children);

            foreach (var child in children)
            {
                FindChildren(child.Id);
            }
        }
        FindChildren(subdivisionId);

        foreach(var sub in result){
            var emp = GetEmployees(sub.Id);
            employeeAll.AddRange(emp);
        }

        var empDto = mapper.Map<IEnumerable<EmployeeDto>>(employeeAll);
        return Ok(empDto);

    }

}