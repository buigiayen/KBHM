using System;
using System.Collections.Generic;

namespace KBHM.api.Model
{
    public class Person : Filter
    {
      
        public Guid RowID { get; set; }
        public string Name { get; set; }
        public DateTime BirthDay { get; set; }
        public int Sex { get; set; }
        public string CCCD { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string NoiCapCCCD { get; set; }
        public string DiaChiThuongTru_ChiTiet { get; set; }
        public string DiaChiThuongTru { get; set; }
        public string DiaChiLienLac_ChiTiet { get; set; }
        public string DiaChiLienLac { get; set; }
        public List<PersonProperties> PersonProperties { get; set; }
        
    }
}
