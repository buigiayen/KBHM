using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Services.lib.authorization;
using Services.lib.ELK;
using System;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOcelot();
builder.Services.AddCors();
builder.Services.JWTServices();
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
builder.Host.ConfigLog(builder, Environment.GetEnvironmentVariable("NODEELK"), typeof(Program));




var app = builder.Build();

app.UseCors(x => x
           .AllowAnyMethod()
           .AllowAnyHeader()
           .SetIsOriginAllowed(origin => true) // allow any origin
           .AllowCredentials()); // allow credentials

app.UseHttpsRedirection();
app.UseRouting();
app.UseOcelot();
app.UseAuthentication();
app.UseAuthorization();
app.Run();


