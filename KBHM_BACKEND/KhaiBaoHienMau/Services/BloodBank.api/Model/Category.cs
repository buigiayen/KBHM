using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodBank.api.Model
{
    public class Category
    {
        public List<CategoryData> Location { get; set; }
        public List<CategoryData> ML { get; set; }
        public List<CategoryData> Element { get; set; }
    }
    public class CategoryData
    {
        public string label { get; set; }
        public string value { get; set; }
    }
}
