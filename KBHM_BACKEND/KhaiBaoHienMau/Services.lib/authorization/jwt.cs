using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.lib.authorization
{
    public class jwt
    {
        public static object GenerateJSONWebToken(string KeyValue, string certificate = "ViettinCompanySoftwarecertificate", string Issuer = "ViettinCompanySoftwareIssuer", string Audience = "ViettinCompanySoftwareAudience")
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] { new Claim("User", KeyValue) }),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = Issuer,
                Audience = Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(certificate)), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);
            return token;
        }

    }
}
