namespace RusRoads.API.Entities;

public class Document : Base
{

    public required string Title { get; set; }
    public required string Category { get; set; }

    public required bool hasComments;
    public required bool HasComments { get => hasComments = Comments != null ? Comments.Any() : false; set => hasComments = value; }
    public IEnumerable<Comment>? Comments { get; set; }


    public DateTime DateСreated { get; set; } = DateTime.UtcNow;
    public DateTime DateUpdated { get; set; } = DateTime.UtcNow;
}