using Microsoft.Extensions.Logging;
using Serilog.Events;
using System.Text.Json;

namespace Services.lib.Logger
{
  
    public class Logger
    {
        private ILogger<Logger> _Ilogger;
        public  Logger(ILogger<Logger> Ilogger)
        {
            _Ilogger = Ilogger;
        }
        public void WriteLog(string messenger, LogEventLevel logEventLevel)
        {
            switch (logEventLevel)
            {
                case LogEventLevel.Debug:
                    _Ilogger.LogDebug(messenger);
                    break;
                case LogEventLevel.Information:
                    _Ilogger.LogInformation(messenger);
                    break;
                case LogEventLevel.Warning:
                    _Ilogger.LogWarning(messenger);
                    break;
                case LogEventLevel.Error:
                    _Ilogger.LogError(messenger);
                    break;
                default:
                    _Ilogger.LogTrace(messenger);
                    break;
            }
        }
     
       
       
    }
}
