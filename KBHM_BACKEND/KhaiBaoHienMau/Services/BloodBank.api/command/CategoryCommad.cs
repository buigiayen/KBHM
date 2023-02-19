using BloodBank.api.interfaces;
using BloodBank.api.Model;
using Services.lib.Sql;
using System.Threading.Tasks;

namespace BloodBank.api.command
{
    public class CategoryCommad : ICategory
    {
        private readonly IConnection _context;
        public CategoryCommad(IConnection context)
        {
            _context = context;
        }
        public async Task<HttpObject.API> GetLocation()
        {
            string sql = "select rowguid as ID , SourceName from tbl_BloodSource";
            return await Dataprovider.db._Connection(_context.CreateConnection())._Query(sql).SQLQueryAsync();
        }

        public async Task<HttpObject.API> GetMlBoold()
        {
            string sql = "select rowguid as ID ,Volume from tbl_BloodVolume";
            return await Dataprovider.db._Connection(_context.CreateConnection())._Query(sql).SQLQueryAsync();
        }
    }
}
