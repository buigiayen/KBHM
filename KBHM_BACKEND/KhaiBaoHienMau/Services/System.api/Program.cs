using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.api.infrastructure;
using Services.lib.ELK;
using System;
using Microsoft.Data.SqlClient;
using System.Data;
using Services.lib.Sql;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddTransient<MinioContext>();
builder.Services.AddSingleton<System.api.Interfaces.IRegion, System.api.Command.Region>();
builder.Services.AddSingleton<System.api.Interfaces.IMinio, System.api.Command.MinioCommand>();
Console.WriteLine($"sql {Environment.GetEnvironmentVariable("SQL_CONNECTION")}");
builder.Services.AddTransient<IDbConnection>((sp) => new SqlConnection(Environment.GetEnvironmentVariable("SQL_CONNECTION")));


builder.Services.AddTransient<Dataprovider>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Host.ConfigLog(builder, Environment.GetEnvironmentVariable("NODEELK"), typeof(Program));

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();