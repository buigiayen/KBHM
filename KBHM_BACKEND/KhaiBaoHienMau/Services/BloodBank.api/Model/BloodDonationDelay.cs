using System;

namespace BloodBank.api.Model
{
    public class BloodDonationDelay
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

        public string ContactAddress { get; set; }

        public Guid rowguild { get; set; }

        public DateTime? RegisterDate { get; set; }

        public int? LeverDelay { get; set; }

        public int? Delay { get; set; }

        public bool? TimeBloodDonorsReiterated { get; set; }

        public bool? Weight { get; set; }

        public bool? BloodPressure { get; set; }

        public bool? Pulse { get; set; }

        public bool? Hb { get; set; }

        public bool? HBsAg { get; set; }

        public bool? RickBehavior { get; set; }

        public bool? HealthHistory { get; set; }

        public string Other1 { get; set; }

        public string Other3 { get; set; }

        public int? TimeDelay { get; set; }

        public int? Upload { get; set; }

        public string UserUpload { get; set; }

        public DateTime? TimeUpload { get; set; }

        public bool? IsNew { get; set; }

        public bool? IsUpdate { get; set; }

        public bool? WBCQuantity { get; set; }

        public bool? PLTQuantity { get; set; }

        public bool? MCV { get; set; }

        public bool? Hct { get; set; }

        public bool? HIV { get; set; }

        public bool? HCV { get; set; }

        public bool? VDRL { get; set; }

        public bool? KTBT { get; set; }

        public bool? HTLV { get; set; }

        public bool? PlasmaRed { get; set; }

        public bool? PlasmaOpaque { get; set; }

        public bool? PlasmaBlue { get; set; }

        public bool? SmallVeins { get; set; }

        public DateTime? ResultTime { get; set; }

        public bool? HBV { get; set; }

        public bool? AIDS { get; set; }

        public bool? VG { get; set; }

        public bool? Xam { get; set; }

        public bool? CJD { get; set; }

        public bool? Hormon { get; set; }

        public bool? CoombsGT { get; set; }

        public bool? CoombsTT { get; set; }

        public bool? ABO { get; set; }

        public bool? Rh { get; set; }

        public bool? Temperature { get; set; }

        public bool? KQHIV { get; set; }

        public bool? KQHBV { get; set; }

        public bool? KQHCV { get; set; }

        public bool? KQVDRL { get; set; }

        public bool? HBsAgTN { get; set; }

        public string CCCD { get; set; }

        public string ABO_Donor { get; set; }

        public string Rh_Donor { get; set; }

        public string Comment { get; set; }

    }
}
