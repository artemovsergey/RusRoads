namespace RusRoads.API.Response;

public class ErrorModel
{

    public DateTime timestamp {get; set;}
    public string message {get; set;} = string.Empty;
    public  string errorCode {get; set;} = string.Empty;
    
}