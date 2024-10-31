using System;
using System.ComponentModel;

namespace BloodBank.api.Model
{
    public class SidNormalRange
    {
        public string SID { get; set; }

        public DateTime DateOfBirth { get; set; }

        public bool IsMale { get; set; }

        public string TestCode { get; set; }

        public string NormalRange { get; set; }

        public double? LowerLimit { get; set; }

        public double? HigherLimit { get; set; }
    }

    public class NormalRangeInfo
    {
        public string TestCode { get; set; }

        public string NormalRange { get; set; }

        public double? LowerLimit { get; set; }

        public double? HigherLimit { get; set; }
    }

    public class PatientNormalRangeInfo
    {
        public int? AutoId { get; set; }

        public string TestCode { get; set; }

        public int? FromAge { get; set; }

        public int? ToAge { get; set; }

        public bool PSex { get; set; }

        public string PNormalRange { get; set; }

        public double? PLowerlimit { get; set; }

        public double? PHigherlimit { get; set; }

        public NormalRangeCalculateTypeEnum CalculateType { get; set; }
    }

    public enum NormalRangeCalculateTypeEnum
    {
        [Description("Ngày")]
        Day = 1,

        [Description("Tháng")]
        Month = 2,

        [Description("Năm")]
        Year = 3
    }
}
