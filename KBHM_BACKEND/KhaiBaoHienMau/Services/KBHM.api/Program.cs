using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Services.lib.authorization;
using Services.lib.ELK;
using Services.lib.Sql;
using System;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.JWTServices();


builder.Services.AddTransient<KBHM.api.Interfaces.Person, KBHM.api.Command.Person>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IDbConnection>((sp) => new SqlConnection(Environment.GetEnvironmentVariable("SQL_CONNECTION")));
builder.Services.AddTransient<Dataprovider>();
builder.Host.ConfigLog(builder, Environment.GetEnvironmentVariable("NODEELK"), typeof(Program));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
