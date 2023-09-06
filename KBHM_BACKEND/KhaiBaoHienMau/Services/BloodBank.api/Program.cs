using BloodBank.api.command;
using BloodBank.api.interfaces;
using BloodBank.api.Validator;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Services.lib.authorization;
using Services.lib.ELK;
using Services.lib.Sql;
using System;
using System.Data;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);
builder.Services.JWTServices();
builder.Services.AddControllers().AddFluentValidation(fv =>
{
    fv.RegisterValidatorsFromAssemblyContaining<LoginValidator>();

}).ConfigureApiBehaviorOptions(o =>
{
    o.InvalidModelStateResponseFactory = c =>
    {
        var errors = string.Join('\n', c.ModelState.Values.Where(v => v.Errors.Count > 0).SelectMany(v => v.Errors).Select(v => v.ErrorMessage));
        return new BadRequestObjectResult(new HttpObject.APIresult
        {
            code = HttpObject.Enums.Httpstatuscode_API.ERROR,
            Data = null,
            Messenger = errors,

        });
    };
});


builder.Services.AddTransient<ICategory, CategoryCommad>();
builder.Services.AddTransient<ISyncDonnor, SyncPatient>();
builder.Services.AddTransient<ILogin, LoginCommand>();
Console.WriteLine($"sql {Environment.GetEnvironmentVariable("SQL_CONNECTION")}");
builder.Services.AddTransient<IDbConnection>((sp) => new SqlConnection(Environment.GetEnvironmentVariable("SQL_CONNECTION")));
builder.Services.AddTransient<Dataprovider>();

builder.Host.ConfigLog(builder, Environment.GetEnvironmentVariable("NODEELK"), typeof(Program));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Host.UseSerilog();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthorization();

app.MapControllers();

app.Run();
