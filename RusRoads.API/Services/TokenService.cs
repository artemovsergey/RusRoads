using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace RusRoads.API.Services;

public class TokenService(IConfiguration config)
{

    private readonly SymmetricSecurityKey _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenPublicKey"]!));
   
    public string CreateToken(string UserLogin)
    {
       var claims =  new List<Claim>{
         new Claim(JwtRegisteredClaimNames.Name, UserLogin)
       };

       var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

       var tokenDecriptor = new SecurityTokenDescriptor(){
         Subject = new ClaimsIdentity(claims),
         Expires = DateTime.UtcNow.AddDays(7),
         SigningCredentials = creds
       };

       var tokenHandler = new JwtSecurityTokenHandler();
       var token = tokenHandler.CreateToken(tokenDecriptor);
       return tokenHandler.WriteToken(token);

    }
}