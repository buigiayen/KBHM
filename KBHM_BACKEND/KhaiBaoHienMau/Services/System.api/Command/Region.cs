using System.Threading.Tasks;
using Services.lib.Sql;
using static System.Net.Mime.MediaTypeNames;

namespace System.api.Command
{
    public class Region : Interfaces.IRegion
    {

        public Region()
        {
        }
        public async Task<Services.lib.Sql.HttpObject.APIresult> GetRegion(int Status, string regionId)
        {
            string sql = "SP_REGION_VN @STATUS = @status ,@TEXT =@TEXT";
        
            return await Dataprovider.db._Query(sql)._ParamterSQL(new
            {
                STATUS = Status,
                TEXT = regionId
            }).SQLQueryAsync();
        }
    }
}
