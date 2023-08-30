using System;

namespace KBHM.api.Model
{
    public class Filter
    {
        public string Text { get; set; }
        public int Row { get; set; }
        public DateTime FromDate { get; set; } = DateTime.Now.Date.AddDays(-1);
        public DateTime ToDate { get; set; } = DateTime.Now.Date.AddDays(+1);
    }
}
