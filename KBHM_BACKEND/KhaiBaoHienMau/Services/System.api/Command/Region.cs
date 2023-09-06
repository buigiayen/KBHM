using Services.lib.Sql;
using System.Threading.Tasks;

namespace System.api.Command
{
    public class Region : Interfaces.IRegion
    {
        Dataprovider dataprovider;
        public Region(Dataprovider dataprovider)
        {
            this.dataprovider = dataprovider;
        }
        public async Task<Services.lib.Sql.HttpObject.APIresult> GetRegion(int Status, string regionId)
        {
            string sql = "SP_REGION_VN @STATUS = @status ,@TEXT =@TEXT";

            return await dataprovider.SQLQueryAsync(sql, new
            {
                STATUS = Status,
                TEXT = regionId
            });
        }
    }
}
