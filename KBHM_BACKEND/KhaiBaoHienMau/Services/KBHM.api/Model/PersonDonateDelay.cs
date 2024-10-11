using System;

namespace KBHM.api.Model
{
    public class PersonDonateDelay
    {
        public Guid RowID { get; set; }

        public string CCCD { get; set; }

        public DateTime DelayDate { get; set; }

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
