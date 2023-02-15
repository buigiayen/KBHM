using Services.lib.authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.lib.exception
{
    public class ExceptionBase 
    {
        public ExceptionBase(object ObjectRequired)
        {
            if (ObjectRequired == null)
            {

            }
        }

    }
}
