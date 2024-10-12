using System;
using System.Collections.Generic;

namespace BloodBank.api.Model
{
    public class Donnor
    {
        public class tbl_Donor
        {
            public DateTime DateIn { get; set; }
            public String DonorCode { get; set; }
            public String DonorName { get; set; }
            public String DonorNameUnsign { get; set; }
            public String Sex { get; set; }
            public int? Age { get; set; }
            public String Address { get; set; }
            public String Phone { get; set; }
            public DateTime BirthDay { get; set; }
            public string IdentityID { get; set; }
            public string JobID { get; set; }
            public string DonorExCode { get; set; }
            public string BloodSourceLocationId { get; set; }
            public string BloodVolume { get; set; }
            public string ElementID { get; set; }
            public string ContactAddress { get; set; }
            public string BLOODPRESSURE { get; set; }
            public string HGB { get; set; }
            public string PULSE { get; set; }
            public string STATUS { get; set; }
            public string WEIGH { get; set; }
            public string HEIGH { get; set; }
            public string SID { get; set; }
            public string ABO { get; set; }
            public string Rh { get; set; }
            public string HST { get; set; }
            public string HBV { get; set; }
            public string DoctorID { get; set; }
        }
        public class HistoryDonnor
        {
            public HistoryDonnor()
            {
                resultBloods = new List<ResultBlood>();
            }
            public DateTime? DateIn { get; set; }
            public string ABORH { get; set; }
            public string BCI { get; set; }
            public List<ResultBlood> resultBloods { get; set; }
        }
        public class TestGroupDetail
        {
            public string SID { get; set; }
            public DateTime? DateIn { get; set; }
            public string KetLuan { get; set; }
        }
        public class ResultBlood
        {
            public string TestCode { get; set; }
            public string Result { get; set; }
        }
    }
}
