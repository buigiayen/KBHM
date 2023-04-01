using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

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
                   webBuilder.UseKestrel(options => options.ListenAnyIP(9784, listenOptions => listenOptions.UseHttps(
                       adapterOptions =>
                       {
                           adapterOptions.ServerCertificate = new X509Certificate2("./hienmau.bvdktinhthanhhoa.com.vn.pfx", "docker");
                       })));
               });
    }
}
