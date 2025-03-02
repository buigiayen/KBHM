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
using Services.lib.authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.JWTServices();

builder.Services.AddControllers();
builder.Services.AddTransient<MinioContext>();
builder.Services.AddSingleton<System.api.Interfaces.IRegion, System.api.Command.Region>();
builder.Services.AddSingleton<System.api.Interfaces.IMinio, System.api.Command.MinioCommand>();
builder.Services.AddTransient<IDbConnection>((sp) => new SqlConnection(Environment.GetEnvironmentVariable("SQL_CONNECTION")));
builder.Services.AddTransient<Dataprovider>();

builder.Services.AddControllers();
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