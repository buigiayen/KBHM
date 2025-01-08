using Services.lib.Sql;
using System;
using System.Threading.Tasks;

namespace KBHM.api.Command
{
    public class QrDonation : Interfaces.QrDonation
    {
        Dataprovider _dataprovider;
        public QrDonation(Dataprovider dataprovider)
        {
            _dataprovider = dataprovider;
        }

        public async Task<HttpObject.APIresult> CreateQR(Model.QrDonation qrDonation)
        {
            Guid RowsID = Guid.NewGuid();
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{RowsID}';" +
                          " Insert into QrDonation(RowID,DiemLayMau,NgayHien,UserCreate,CreateTime,Active) values (@ROWIDs,@DiemLayMau,@NgayHien,@UserCreate,@CreateTime,1) " +
                          " Select @ROWIDs as RowID";
                
            return await _dataprovider.SQLQueryAsync(sql, qrDonation);
        }

        public async Task<HttpObject.APIresult> GetQrDonationActive(Guid RowID)
        {
            string sql = $" Select * from QrDonation Where RowID = @RowID and Active = 1";
            return await _dataprovider.SQLQueryAsync(sql, new { RowID = RowID });
        }

        public async Task<HttpObject.APIresult> ChangeActive(Model.QrDonation qrDonation)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{qrDonation.RowID}';" +
                          " Update QrDonation set Active=@Active where RowID = @ROWIDs";

            return await _dataprovider.SQLQueryAsync(sql, qrDonation);
        }


    }
}
