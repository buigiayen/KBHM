using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Services.lib.authorization
{
    public static class jwt_md
    {
        public static IServiceCollection JWTServices(this IServiceCollection servies, string certificate = "ViettinCompanySoftwarecertificate", string Issuer = "ViettinCompanySoftwareIssuer", string Audience = "ViettinCompanySoftwareAudience")
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
