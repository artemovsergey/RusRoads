using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RusRoads.API.Data;
using RusRoads.API.Entities;
using RusRoads.API.Response;

namespace RusRoads.API.Controllers
{
    [ApiController]
    [Route("api/v1")]
    public class UsersController(RusRoadsContext db) : ControllerBase
    {

        [Authorize]
        [HttpPost("SignIn")]
        public ActionResult<ErrorModel> SignIn(UserDto userDto){

            var token = "";
            // проверяем login password
            var user = db.Users.Where(u => u.Login == userDto.Login && u.Password == userDto.Passoword).FirstOrDefault();

            if(user == null) return StatusCode(403,new ErrorModel(){ errorCode = "403", 
                                                                 message = "Неправильный логин или пароль",
                                                                 timestamp = DateTime.Now.Date } );

            // создаем jwt token

            return Ok(token);
        }
        
    }
}