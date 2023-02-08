using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            _FileName = DateTime.Now.ToString()+"_"+ filename;
            return this;
        }
        public Logger Messenger(string exception)
        {
            _Messenge = DateTime.Now + "  ----------  " + exception;
            return this;
        }
        public void build(_TypeFile _TypeFile)
        {
            StreamWriter sw = null;
            try
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + "log/" + Enum.Parse(typeof(_TypeFile), _TypeFile.ToString()) + "/" ;
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                path += _FileName;
                sw = new StreamWriter(path, true);
                sw.WriteLine(_Messenge);
                sw.Flush();
                sw.Close();
            }
            catch
            {
                // ignored
            }
        }
    }
}
