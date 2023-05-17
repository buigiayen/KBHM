using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodBank.api.interfaces
{
    public interface ISyncDonnor 
    {
        Task<Services.lib.Sql.HttpObject.APIresult> SyncDonnorEx(Model.Donnor.tbl_Donor donnor);
        Task<Services.lib.Sql.HttpObject.APIMapper<dynamic>> CheckDonnorEx(string DonorExCode);

    }
}
