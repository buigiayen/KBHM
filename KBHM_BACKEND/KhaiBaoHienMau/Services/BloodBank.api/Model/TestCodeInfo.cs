using System;

namespace BloodBank.api.Model
{
    public class TestCodeInfo
    {
        public string TestCode { get; set; }
        public string QuickCode { get; set; }
        public string TestName { get; set; }
        public TestType TestType { get; set; }
        public StatusBoold? statusBoold { get; set; }
        public string MappingTestCode { get; set; }
    }

    public enum TestType
    {
        ABORH = 0,
        MD = 1,
        NAT = 2,
        NULL = 3
    }
    public enum StatusBoold
    {
        NULL = -2,
        UCFM = -1,
        CFM = 0,
        VAL = 1,
        UPL = 2,
    }

    public class ConfigInfo
    {
        public string ConfigID { get; set; }

        public string Value { get; set; }
    }


    public class ResultBlood : TestCodeInfo
    {
        public string ID { get; set; }
        public string SIDRoot { get; set; }
        public string SIDChild { get; set; }
        public string UserInsert { get; set; }
        public DateTime DateInsert { get; set; }
        public string Result { get; set; }
        public string Comment { get; set; }
        public string Status { get; set; }
        public string Result2 { get; set; }
        public string Result_TM { get; set; }
        public bool NAT { get; set; }
        public string UserUpdateResult { get; set; }
        public string UserUpdateResult2 { get; set; }
        public bool ReRun { get; set; }
        public int ColorResult { get; set; }
        public int ColorResult2 { get; set; }
        public DateTime DateGet { get; set; }
        public DateTime DateIn { get; set; }
        public string UserXN { get; set; }
        public string BloodID { get; set; }
        public string ABO { get; set; }
        public string Rh { get; set; }
        public DateTime? TimeXN { get; set; }
    }
}
