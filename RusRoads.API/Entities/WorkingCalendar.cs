namespace RusRoads.API.Entities;

public class WorkingCalendar : Base
{
    public required DateTime ExceptionDate {get; set;}
    public required bool IsWorkingDay {get; set;}
}