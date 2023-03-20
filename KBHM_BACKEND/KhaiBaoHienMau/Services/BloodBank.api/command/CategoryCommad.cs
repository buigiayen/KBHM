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
            string sql = "select BloodSourceLocationId as value , BloodSourceLocationName as label  from tbl_Config_BloodSourceLocation";
            return await Dataprovider.db._Query(sql).SQLQueryAsync();
        }

        public async Task<HttpObject.API> GetMlBoold()
        {
            string sql = "select Volume as value ,Volume as label from tbl_BloodVolume";
            return await Dataprovider.db._Query(sql).SQLQueryAsync();


        }
        public async Task<HttpObject.API> GetElementBoold()
        {
            string sql = "select ElementID as value, ElementName as label from tbl_Element";
            return await Dataprovider.db._Query(sql).SQLQueryAsync();
        }
    }
}
