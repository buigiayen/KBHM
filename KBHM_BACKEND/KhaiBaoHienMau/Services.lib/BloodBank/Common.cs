namespace Services.lib.BloodBank
{
    public static class Common
    {
        public static string ConvertSex(string Sex)
        {
            switch (Sex)
            {
                case "1": return "M";
                case "2": return "F";
                default: return "?";
            }
        }
    }
}
