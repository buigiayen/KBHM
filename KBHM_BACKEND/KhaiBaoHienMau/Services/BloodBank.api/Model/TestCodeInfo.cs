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
}
