using Microsoft.AspNetCore.Mvc;
using RusRoads.API.Data;
using RusRoads.API.Entities;

namespace RusRoads.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubdivisionsController(RusRoadsContext db) : BaseController<Subdivision>(db)
{
    // crud

    // вывод иерархии подразделений
}