using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodBank.api.Model
{
  
    public class SequenceNumInfo
    {
        public const string SequenceIDIdentityID = "IDENTITY_ID";
        public string SequenceId { get; set; }
        public long StartNum { get; set; }
        public long EndNum { get; set; }
        public long CurrentVal { get; set; }
        public SequenceResetMode ResetMode { get; set; }
        public DateTime LastUpdate { get; set; }
        public DateTime ServerTime { get; set; }
    }
    public enum SequenceResetMode
    {
        None = 0,

        ByDay = 1,

        ByMonth = 2,

        ByYear = 3
    }

}
