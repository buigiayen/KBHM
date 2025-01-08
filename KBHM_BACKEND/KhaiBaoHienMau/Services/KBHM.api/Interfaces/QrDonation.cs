using Services.lib.Sql;
using System;
using System.Threading.Tasks;

namespace KBHM.api.Interfaces
{
    public interface QrDonation
    {
        Task<HttpObject.APIresult> CreateQR(Model.QrDonation qrDonation);

        Task<HttpObject.APIresult> GetQrDonationActive(Guid RowID);

        Task<HttpObject.APIresult> ChangeActive(Model.QrDonation qrDonation);
    }
}
