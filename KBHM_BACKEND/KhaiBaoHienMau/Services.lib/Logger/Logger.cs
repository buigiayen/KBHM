using System;
using System.IO;
using System.Text.Json;

namespace Services.lib.Logger
{
    public class Logger
    {
        public enum _TypeFile
        {
            Debug = 1,
            Error = 2,
            Warning = 3,
            Information = 4,
        }
        public static readonly Logger Instance = new Logger();

        private string _Messenge { get; set; }
        private string _FileName { get; set; }
        public Logger FileName(string filename = "logger.txt")
        {
            _FileName = DateTime.Now.ToString() + "_" + filename;
            return this;
        }
        public Logger Messenger(string exception)
        {
            _Messenge = DateTime.Now + "  ----------  " + exception;
            return this;
        }
        public Logger MesserngerClass(object exs)
        {
            try
            {
                if (exs != default)
                {
                    _Messenge = JsonSerializer.Serialize(exs);
                }

            }
            catch (Exception ex)
            {
                _Messenge = "1001: " + ex.Message;
            }
            return this;
        }
        public void build(_TypeFile _TypeFile)
        {
            Console.WriteLine(_Messenge);
            StreamWriter sw = null;
            try
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + "log/" + Enum.Parse(typeof(_TypeFile), _TypeFile.ToString()) + "/";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                path += _FileName ?? "Logger.txt";
                if (!File.Exists(path))
                {
                    File.Create(path);
                }
                sw = new StreamWriter(path, true);
                sw.WriteLine(_Messenge);
                sw.Flush();
                sw.Close();
            }
            catch (Exception ex)
            {
                // ignored
            }
        }
    }
}
