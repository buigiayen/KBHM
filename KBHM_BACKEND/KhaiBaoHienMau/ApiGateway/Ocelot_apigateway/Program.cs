using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;

namespace Ocelot_apigateway
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
           Host.CreateDefaultBuilder(args)
               .ConfigureWebHostDefaults(webBuilder =>
               {
                   webBuilder.UseStartup<Startup>();
                   var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                   Console.WriteLine(env);
                   webBuilder.ConfigureAppConfiguration(conf => conf.AddJsonFile($"ocelot.json"));

               });
    }
}
