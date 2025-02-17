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

        // найти сотрудников самого подразделения
        var emp = GetEmployees(subdivisionId);

        // надо узнать зависимые подразделения
        var childSubdivions = db.Subdivisions.Where(s => s.HeadSubdivisionId == subdivisionId && s.Id != subdivisionId).ToList();



        // var emp = db.Employees

        return Ok();
    }

    // вывод иерархии подразделений
}