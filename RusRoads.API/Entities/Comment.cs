using System.ComponentModel.DataAnnotations.Schema;

namespace RusRoads.API.Entities;

public class Comment : Base
{
    public required string Text {get; set;}

    public int? DocumentId {get ;set;}
    public Document? Document {get; set;}

    public int AuthorId {get; set;}

    [ForeignKey("AuthorId")]
    public Employee? Author {get; set;}
}

public class CommentDto{

    public int Id {get; set;}
    public string DateCreated {get; set;} = DateTime.UtcNow.ToString();
    public string DateUpdated {get; set;} = DateTime.UtcNow.ToString();
    public int DocumentId {get; set;}
    public required string Text {get; set;}
    public AuthorDto? Author {get; set;}
}

public record AuthorDto(string Name, string Position);