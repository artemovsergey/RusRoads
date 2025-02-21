using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RusRoads.API.Data;
using RusRoads.API.Dtos;
using RusRoads.API.Entities;

namespace RusRoads.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController(RusRoadsContext db, IMapper mapper) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployess(){

        var emp = await db.Employees.ToListAsync();
        var empDto = mapper.Map<IEnumerable<EmployeeDto>>(emp);

        return Ok(empDto);
    }

    [HttpGet("subdivisionId")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeBySubdivisions(int subdivisionId){

        var emp = await db.Employees.Where(e => e.SubdivisionId == subdivisionId).ToListAsync();
        var empDto = mapper.Map<IEnumerable<EmployeeDto>>(emp);

        return Ok(empDto);
    }

    // crud

    // список событий сотрудника по отпускам, отгулам и отсутствиям

    // сотрудники конкретного подразделения
    // сортировка
    // фильтрация
    // группировка по типу
}