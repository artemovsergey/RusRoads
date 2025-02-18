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

    private IEnumerable<Employee> GetEmployees(int id)
    {
        return db.Employees.Where(s => s.SubdivisionId == id).ToList();
    }

    [HttpGet("{subdivisionId}/employees")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmpBySubdivisions(int subdivisionId)
    {
        // Найти сотрудников самого подразделения
        var employees = await GetEmployeesAsync(subdivisionId);

        // Найти все дочерние подразделения (рекурсивно)
        var childSubdivisions = await GetChildSubdivisionsAsync(subdivisionId);

        // Собрать сотрудников всех дочерних подразделений
        foreach (var child in childSubdivisions)
        {
            var childEmployees = await GetEmployeesAsync(child.Id);
            employees.AddRange(childEmployees);
        }

        return Ok(employees);
    }

    private async Task<List<Employee>> GetEmployeesAsync(int subdivisionId)
    {
        return await db.Employees
            .Where(e => e.SubdivisionId == subdivisionId)
            .ToListAsync();
    }

    private async Task<List<Subdivision>> GetChildSubdivisionsAsync(int subdivisionId)
    {
        var allSubdivisions = await db.Subdivisions.ToListAsync();
        var result = new List<Subdivision>();

        // Рекурсивная функция для поиска всех дочерних подразделений
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
        return result;
    }

}