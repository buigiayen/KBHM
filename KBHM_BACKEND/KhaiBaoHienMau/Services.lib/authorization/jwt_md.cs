using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.lib.authorization
{
    public static class jwt_md
    {
        public static IServiceCollection JWTServices(this IServiceCollection servies, string certificate = "CresoftCompanySoftwarecertificate", string Issuer = "CresoftCompanySoftwareIssuer", string Audience = "CresoftCompanySoftwareAudience")
        {
            servies.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Issuer,
                    ValidAudience = Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(certificate))
                };
            });
            return servies;
        }
    }
}
