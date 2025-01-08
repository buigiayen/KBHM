using System;

namespace KBHM.api.Model
{
    public class QrDonation
    {
        public Guid RowID { get; set; }

        public string DiemLayMau { get; set; }

        public DateTime NgayHien { get; set; }

        public string UserCreate { get; set; }

        public DateTime CreateTime { get; set; }

        public bool Active { get; set; }
    }
}
