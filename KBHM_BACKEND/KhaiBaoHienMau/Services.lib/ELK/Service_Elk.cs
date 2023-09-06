using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;


namespace Services.lib.ELK
{
    public static class Service_Elk
    {
        public static IHostBuilder ConfigLog(this IHostBuilder servies, WebApplicationBuilder builder, string NodeELK, Type Program)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.Debug()
                .MinimumLevel.Verbose()
                .WriteTo.Elasticsearch(NodeELK ?? "http://localhost:9200",
                Program.Assembly.FullName.Split(',')[0] ).CreateLogger();
            builder.Host.UseSerilog();
            return servies;
        }
    }
}
