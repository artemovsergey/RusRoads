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
    public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployess()
    {

        var emp = await db.Employees.ToListAsync();

        var empDtom = emp.Select(e => new { Id = e.Id}).ToList();

        var empDto = mapper.Map<IEnumerable<EmployeeDto>>(emp);

        return Ok(empDto);
    }

    [HttpGet("subdivisionId")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeBySubdivisions(int subdivisionId)
    {

        var emp = await db.Employees.Where(e => e.SubdivisionId == subdivisionId).ToListAsync();
        var empDto = mapper.Map<IEnumerable<EmployeeDto>>(emp);

        return Ok(empDto);
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> Create(EmployeeDto empDto)
    {

        var emp = mapper.Map<Employee>(empDto);

        try
        {
            db.Employees.Add(emp);
            await db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception($"{ex.InnerException.Message}");
        }

        return Created("", emp);

    }


    [HttpPut]
    public async Task<ActionResult<Employee>> Update(EmployeeDto employeeDto){

        var emp = mapper.Map<Employee>(employeeDto);

        try
        {
          db.Employees.Update(emp);
          await db.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {
            throw new Exception($"{ex.InnerException!.Message}");
        }
        
        return Ok(emp);
    }


    [HttpDelete("{empId}")]
    public async Task<ActionResult<Employee>> Delete(int empId){

        var emp = db.Employees.Find(empId);
        if(emp == null) return BadRequest($"Нет сотрудника с id = {empId}");

        try
        {
           db.Employees.Remove(emp);
           await db.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {
            throw new Exception($"{ex.InnerException.Message}");
        }
        
        return Ok(emp);

    }
    // crud

    // список событий сотрудника по отпускам, отгулам и отсутствиям

    // сотрудники конкретного подразделения
    // сортировка
    // фильтрация
    // группировка по типу
}