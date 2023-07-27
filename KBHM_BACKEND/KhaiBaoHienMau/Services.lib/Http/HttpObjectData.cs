using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.lib.Http
{
    public class HttpObjectData
    {
        public class Enums
        {
            public enum Httpstatuscode_API
            {
                OK = 1,
                ERROR = 0,
                NULL = -2,
                WARN = 2,
            }
        }
        public class APIresult : API
        {
            public object Data { get; set; }
        }
        public class APIMapper<T> : API where T : class
        {
            public T Data { get; set; }
        }
        public class API : Enums
        {
            public Httpstatuscode_API code { get; set; } = Httpstatuscode_API.OK;
            public string Messenger { get; set; } = "Success!";
        }
    }
}
