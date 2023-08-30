using System;

namespace KBHM.api.Model
{
    public class PersonProperties : Model.Person
    {
        public int RowID { get; set; }
        public Guid ID { get; set; }
        public string Key { get; set; }
        public string Label { get; set; }
        public string value { get; set; }
        public bool GetBloodbank { get; set; }
    }
}
