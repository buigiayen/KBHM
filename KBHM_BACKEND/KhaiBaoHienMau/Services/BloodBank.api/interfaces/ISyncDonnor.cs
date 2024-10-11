using Services.lib.Http;
using System.Threading.Tasks;

namespace BloodBank.api.interfaces
{
    public interface ISyncDonnor
    {
        Task<Services.lib.Sql.HttpObject.APIresult> SyncDonnorEx(Model.Donnor.tbl_Donor donnor);
        Task<Services.lib.Sql.HttpObject.APIMapper<dynamic>> CheckDonnorEx(string DonorExCode);
        Task<HttpObjectData.APIresult> HistoryDonnorAsync(string IdentityID);
        Task<HttpObjectData.APIresult> SyncDonorDelay(Model.BloodDonationDelay delay);
        Task<HttpObjectData.APIresult> SyncDeleteDonorDelay(Model.BloodDonationDelay delay);
    }
}
