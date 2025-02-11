using Microsoft.AspNetCore.Mvc;
using RusRoads.API.Data;
using RusRoads.API.Entities;

namespace RusRoads.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController(RusRoadsContext db) : BaseController<Employee>(db)
{
    // crud

    // список событий сотрудника по отпускам, отгулам и отсутствиям

    // сотрудники конкретного подразделения
    // сортировка
    // фильтрация
    // группировка по типу
}