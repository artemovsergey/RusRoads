using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RusRoads.API.Data;
using RusRoads.API.Entities;
using RusRoads.API.Response;
using RusRoads.API.Services;

namespace RusRoads.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v1")]
public class UsersController(RusRoadsContext db, TokenService tokenService) : ControllerBase
{

    [AllowAnonymous]
    [HttpPost("SignIn")]
    public ActionResult<ErrorModel> SignIn(UserDto userDto)
    {

        var user = db.Users.Where(u => u.Name == userDto.Name && u.Password == userDto.Password).FirstOrDefault();

        if (user == null) return StatusCode(403, new ErrorModel()
        {
            ErrorCode = "403",
            Message = "Неправильный логин или пароль",
            Timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
        });

        var token = tokenService.CreateToken(userDto.Name);

        return Ok(token);
    }

    [HttpGet("Documents")]
    public ActionResult<ErrorModel> GetComments()
    {

        IEnumerable<Object> docs;
        try
        {
            docs = db.Documents.Select(d => new
            {
                id = d.Id,
                title = d.Title,
                date_created = d.DateСreated.ToString("yyyy-MM-dd HH:mm:ss"),
                date_updated = d.DateUpdated.ToString("yyyy-MM-dd HH:mm:ss"),
                category = d.Category,
                has_comments = d.HasComments

            }).ToList();
        }
        catch (Exception ex)
        {
            var response = new ErrorModel() { ErrorCode = "400", Message = ex.Message, Timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") };
            return BadRequest(response);
        }

        return Ok(docs);
    }

    [HttpGet("Document/{document_id}/Comments")]
    public ActionResult<ErrorModel> GetCommentsInDocument(int document_id)
    {

        var doc = db.Documents.Include(d => d.Comments)!.ThenInclude(c => c.Author).Where(d => d.Id == document_id).FirstOrDefault();

        if (doc == null) return NotFound(new ErrorModel() { ErrorCode = "404", Message = "Нет документа", Timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") });

        var comments = doc?.Comments!.Select(c => new
        {
            id = c.Id,
            text = c.Text,
            document_id = c.DocumentId,
            date_created = c.DateСreated.ToString("yyyy-MM-dd HH:mm:ss"),
            date_updated = c.DateUpdated.ToString("yyyy-MM-dd HH:mm:ss"),
            author = new { name = c.Author!.Fio, position = c.Author.Position }
        }
        ).ToList();

        return Ok(comments);

    }

    [HttpPost("Document/{document_id}/Comment")]
    public ActionResult<ErrorModel> CreateComment(CommentDto commentDto)
    {

        var author = db.Employees.Where(a => a.Fio == commentDto.Author!.Name).Select(e => new
        {
            id = e.Id,
 
        }).FirstOrDefault();

        if (author == null) return BadRequest(new ErrorModel() { ErrorCode = "400", Message = "Нет такого сотрудника", Timestamp = DateTime.Now.ToString() });

        var comment = new Comment()
        {
            DocumentId = commentDto.DocumentId,
            Text = commentDto.Text,
            AuthorId = author.id,
            DateСreated = DateTime.UtcNow,
            DateUpdated = DateTime.UtcNow
        };

        db.Comments.Add(comment);

        try
        {
            db.SaveChanges();
        }
        catch (Exception ex)
        {
            return new ErrorModel() { ErrorCode = "500", Message = ex.Message, Timestamp = DateTime.Now.ToString() };
        }

        return Ok(comment);
    }

}