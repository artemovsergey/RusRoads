using Microsoft.AspNetCore.Mvc;
using RusRoads.API.Data;

namespace RusRoads.API.Controllers;

[ApiController]
public class BaseController<T>(RusRoadsContext db) : ControllerBase where T : class
{

    [HttpGet]
    public ActionResult<IEnumerable<T>> GetAll()
    {
        return Ok(db.Set<T>().ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<T>> Get(int id)
    {
        var entity = await db.Set<T>().FindAsync(id);
        if (entity == null)
        {
            return NotFound();
        }
        return Ok(entity);
    }

    [HttpPost]
    public ActionResult<T> Create(T entity)
    {

        db.Set<T>().Add(entity);
        db.SaveChanges();
        return Created("", entity);
    }

    [HttpPut]
    public ActionResult<T> Update(T entity)
    {

        db.Set<T>().Update(entity);
        db.SaveChanges();

        return Ok(entity);
    }

    [HttpDelete]
    public ActionResult<T> Delete(T entity)
    {
        db.Set<T>().Remove(entity);
        db.SaveChanges();

        return Ok(entity);
    }


}