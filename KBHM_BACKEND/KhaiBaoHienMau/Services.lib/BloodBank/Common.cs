namespace Services.lib.BloodBank
{
    public static class Common
    {
        public static string ConvertSex(string Sex)
        {
            switch (Sex)
            {
                case "0": return "F";
                case "1": return "M";
             
                default: return "?";
            }
        }
    }
}
