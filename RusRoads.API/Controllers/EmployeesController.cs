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

        var empDtom = emp.Select(e => new { Id = e.Id }).ToList();

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
            throw new Exception($"{ex.InnerException?.Message}");
        }

        return Created("", emp);

    }


    [HttpPut]
    public async Task<ActionResult<Employee>> Update(EmployeeDto employeeDto)
    {

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
    public async Task<ActionResult<Employee>> Delete(int empId)
    {

        var emp = db.Employees.Find(empId);
        if (emp == null) return BadRequest($"Нет сотрудника с id = {empId}");

        try
        {
            db.Employees.Remove(emp);
            await db.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {
            throw new Exception($"{ex.InnerException?.Message}");
        }

        return Ok(emp);

    }

    /// <summary>
    /// Увольнение сотрудника (не удаление)
    /// </summary>
    /// <param name="employeeDto"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    [HttpPut("dismiss")]
    public async Task<ActionResult<Employee>> DismissEmployee(EmployeeDto employeeDto)
    {

        var isLearnEmp = await db.Events.AnyAsync(e => e.EmployeeId == employeeDto.Id && e.EventTypeId == 3);
        if (isLearnEmp)
        {
            throw new Exception("У сотрудника есть обучения. Пусть учится!");
        }

        var employee = mapper.Map<Employee>(employeeDto);

        var eventsEmp = await db.Events.Where(e => e.EmployeeId == employeeDto.Id && (e.EventTypeId == 2 || e.EventTypeId == 3)).ToListAsync();

        try
        {
            // удалем записи о событиях отгулов и отпусков, но обучения оставляем (их не будет)
            db.Events.RemoveRange(eventsEmp);

            employee.DismissDate = DateTime.Now;
            db.Employees.Update(employee);
            await db.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {
            throw new Exception($"{ex.InnerException?.Message}");
        }

        return Ok(employee);

    }
}