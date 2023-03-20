using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodBank.api.Model
{
    public class Donnor
    {
		public class tbl_Donor
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

			public string DonorExCode { get; set; }
			public string BloodSourceLocationId { get; set; }
			public string BloodVolume { get; set; }
			public string ElementID { get; set; }
		
			public string BLOODPRESSURE { get; set; }
			public string HGB { get; set; }
			public string PULSE { get; set; }
			public string STATUS { get; set; }
			public string WEIGH { get; set; }
		}

	}
}
