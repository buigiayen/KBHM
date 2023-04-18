using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.lib.BloodBank
{
    public static class Common
    {
        public static string ConvertSex(string Sex)
        {
            switch (Sex)
            {
                case "1": return "M";
                case "2": return "F";
                default: return "?";
            }
        }  
    }
}
