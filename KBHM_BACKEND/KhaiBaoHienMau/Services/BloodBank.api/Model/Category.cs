using System.Collections.Generic;

namespace BloodBank.api.Model
{
    public class Category
    {
        public List<CategoryData> Location { get; set; }
        public List<CategoryData> ML { get; set; }
        public List<CategoryData> Element { get; set; }
        public List<CategoryData> Job { get; set; }
        public List<CategoryData> Trip { get; set; }
        public List<CategoryData> BloodSource { get; set; }
    }
    public class CategoryData
    {
        public string label { get; set; }
        public string value { get; set; }
    }
}
