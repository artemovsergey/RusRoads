namespace RusRoads.API.Response;

public class ErrorModel
{
    public required string  Timestamp {get; set;}
    public string Message {get; set;} = string.Empty;
    public  string ErrorCode {get; set;} = string.Empty;
    
}