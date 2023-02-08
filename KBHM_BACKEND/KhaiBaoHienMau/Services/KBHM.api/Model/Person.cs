using System;
using System.Collections.Generic;

namespace KBHM.api.Model
{
    public class Person
    {
        public Person() { PersonProperties = new List<PersonProperties>(); }
        public Guid RowID { get; set; }
        public string Name { get; set; }
        public DateTime BirthDay { get; set; }
        public int Sex { get; set; }
        public string CCCD { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public List<PersonProperties> PersonProperties { get; set; }

    }
}
