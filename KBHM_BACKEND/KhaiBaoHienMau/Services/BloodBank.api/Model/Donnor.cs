using Microsoft.AspNetCore.Mvc;
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
            public string DonorIdentity { get; set; }
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
            public float? WEIGH { get; set; }
            public float? HEIGH { get; set; }
            public string SID { get; set; }
            public string ABO { get; set; }
            public string Rh { get; set; }
            public string HST { get; set; }
            public string HBV { get; set; }
            public string DoctorID { get; set; }
            public string CCCD { get; set; }
            public string UserSync { get; set; }
            public int? TripID { get; set; }
            public int? DonateID { get; set; }
            public DateTime? ExtractTimeStart { get; set; }
            public DateTime? ExtractTimeEnd { get; set; }
            public int? SourceID { get; set; }
            public string UserID { get; set; }
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

        public class PersonDonateDelay
        {
            public string DonorID { get; set; }

            public DateTime? DelayDate { get; set; }

            public int? DelayTimeline { get; set; }

            public int? DelayTime { get; set; }

            public bool? HIV_Infection { get; set; }

            public bool? HCV_Infection { get; set; }

            public bool? HBV_Infection { get; set; }

            public bool? VDRL_Infection { get; set; }

            public bool? AIDS_Risk { get; set; }

            public bool? Liver_Risk { get; set; }

            public bool? Tattoo { get; set; }

            public bool? CJD { get; set; }

            public bool? Hormon { get; set; }

            public bool? Weight { get; set; }

            public bool? BloodPressure { get; set; }

            public bool? Pulse { get; set; }

            public bool? Temperature { get; set; }

            public bool? Hb { get; set; }

            public bool? HealthHistory { get; set; }

            public string HealthHistoryDetail { get; set; }

            public bool? MCV { get; set; }

            public bool? HCT { get; set; }

            public bool? WhiteBloodCellQuantity { get; set; }

            public bool? SmallVen { get; set; }

            public bool? PlateletQuantity { get; set; }

            public bool? TimeBloodDonorsReiterated { get; set; }

            public bool? HbsAg { get; set; }

            public string Other { get; set; }

            public bool? HIV_Positive { get; set; }

            public bool? HCV_Positive { get; set; }

            public bool? HBV_Positive { get; set; }

            public bool? VDRL_Positive { get; set; }

            public bool? CoombsTT_Positive { get; set; }

            public bool? KTBT_Positive { get; set; }

            public bool? HBsAg_Positive { get; set; }

            public bool? ABO_Undetermined { get; set; }

            public bool? Rh_Undetermined { get; set; }
        }
    }
}
