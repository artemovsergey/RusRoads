using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RusRoads.API.Data;
using RusRoads.API.Entities;

namespace RusRoads.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController(RusRoadsContext db, IMapper mapper) : ControllerBase
{


    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventDto>>> GetEvents()
    {
        var events = await db.Events.OrderByDescending(e => e.BeginDate).ToListAsync();
        var eventDto = mapper.Map<IEnumerable<EventDto>>(events);
        return Ok(eventDto);
    }

    [HttpGet("{employeeId}")]
    public async Task<ActionResult<IEnumerable<EventDto>>> GetEventsByEmp(int employeeId, bool oldEvents, bool currentEvents = true, bool futureEvents = true)
    {

        // группировка

        // var groupedEvents = context.Events
        //     .Join(context.EventTypes, // Соединяем с таблицей типов событий
        //         e => e.EventTypeId,
        //         et => et.Id,
        //         (e, et) => new { Event = e, EventTypeName = et.Name })
        //     .GroupBy(x => x.EventTypeName) // Группируем по названию типа события
        //     .Select(g => new
        //     {
        //         EventTypeName = g.Key, // Название типа события
        //         Events = g.Select(x => x.Event).ToList() // Список событий
        //     })
        //     .ToList();

        IEnumerable<Event> r = new List<Event>();
        
        // все события
        IQueryable<Event> events = db.Events.Where(e => e.EmployeeId == employeeId).OrderByDescending(e => e.BeginDate);

        // прошлые, текущие и будущие

        IQueryable<Event> eventsOld = events.Where(e => e.BeginDate.Date < DateTime.Now.Date && e.EndDate.Date < DateTime.Now.Date);
        IQueryable<Event> eventsCurrent = events.Where(e => e.BeginDate.Date <= DateTime.Now.Date && DateTime.Now.Date <= e.EndDate.Date);
        IQueryable<Event> eventsFuture = events.Where(e => e.BeginDate.Date > DateTime.Now.Date);

        if(oldEvents && currentEvents && futureEvents) r = events.ToList();
        if(oldEvents && currentEvents && !futureEvents) r = eventsOld.Union(eventsCurrent).ToList();
        if(currentEvents && futureEvents && !oldEvents) r = eventsCurrent.Union(eventsFuture).ToList();
        if(oldEvents && futureEvents && !currentEvents) r = eventsOld.Union(eventsFuture).ToList();
        if(oldEvents && !currentEvents && !futureEvents) r = eventsOld.ToList();
        if(currentEvents && !oldEvents && !futureEvents) r = eventsCurrent.ToList();
        if(futureEvents && !currentEvents && !oldEvents) r = eventsFuture.ToList();

        var eventsDto = mapper.Map<IEnumerable<Event>>(r);
        return Ok(eventsDto);

    }

    [HttpPost]
    public async Task<ActionResult<EventDto>> CreateEvent(EventDto eventDto)
    {

        if (eventDto.BeginDate > eventDto.EndDate)
        {
            throw new Exception("Дата начала события должная быть равна или меньше дате окончания события");
        }

        // eventDto.EmployeeId найти пользователя
        var currentEmp = db.Employees.Find(eventDto.EmployeeId);
        if (currentEmp == null) throw new Exception($"Нет сотрудника с id = {eventDto.EmployeeId}");

        // найти все события пользователя
        var currentEmpEvents = await db.Events.Where(e => e.EmployeeId == eventDto.EmployeeId).ToListAsync();

        // 1 - отпуск, 2 - отгул,  3 - обучение

        foreach (var e in currentEmpEvents)
        {
            // проверка отпуска на пересечение с отгулом
            if (eventDto.EventTypeId == 1 && e.EventTypeId == 2)
            {
                if (eventDto.BeginDate.Date >= e.BeginDate.Date && e.BeginDate.Date <= eventDto.EndDate.Date)
                {
                    throw new Exception($"В промежутке дат отпуска с {eventDto.BeginDate.ToShortDateString()} по {eventDto.EndDate.ToShortDateString()} есть дата отгула");
                }
            }

            // проверка отгула на пересечение с обучением или отпуском
            if (eventDto.EventTypeId == 2 && (e.EventTypeId == 3 || e.EventTypeId == 1))
            {
                foreach (var w in db.WorkingCalendars.ToList())
                {
                    if (eventDto.BeginDate.Date == w.ExceptionDate.Date && !w.IsWorkingDay)
                    {
                        throw new Exception($"Отгул не может быть в выходной день {w.ExceptionDate.Date} по производственному календарю");
                    }

                    if (eventDto.BeginDate.Date.DayOfWeek == DayOfWeek.Saturday || eventDto.BeginDate.Date.DayOfWeek == DayOfWeek.Sunday)
                    {
                        throw new Exception($"Отгул не может быть в субботу или воскресенье");
                    }

                }

                if (e.BeginDate.Date <= eventDto.BeginDate.Date && eventDto.BeginDate.Date <= e.EndDate.Date)
                {
                    throw new Exception($"Отгул {eventDto.BeginDate.ToShortDateString()} не может пересекаться с обучением или отпуском c {e.BeginDate.ToShortDateString()} по {e.EndDate.Date.ToShortDateString()}");
                }
            }

            if (eventDto.EventTypeId == 3)
            {
                // обучение отдельно мы не проверяем, так как проверили его вместе с отгулом
            }
        }

        // проверить

        // •	отпуск и отгул не могут быть в одни даты (не могут пересекаться),
        // •	отгул и обучение не могут быть в одни даты (не могут пересекаться),
        // •	отпуск и обучение могут быть в одни даты (могут пересекаться),
        // •	отгул не может быть в выходной день по производственному календарю.

        var eventEntity = mapper.Map<Event>(eventDto);

        try
        {
            db.Events.Add(eventEntity);
            await db.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {
            throw new Exception($"{ex.InnerException!.Message}");
        }

        return Created("", eventDto);
    }

    [HttpDelete("{eventId}")]
    public async Task<ActionResult<Event>> DeleteEvent(int eventId)
    {

        var eventEntity = db.Events.Find(eventId);
        if(eventEntity == null) throw new Exception($"Нет события с id = {eventId}");

        try
        {
            db.Events.Remove(eventEntity);
            await db.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {
            throw new Exception($"{ex.InnerException!.Message}");
        }


        return Ok(eventEntity);
    }
}