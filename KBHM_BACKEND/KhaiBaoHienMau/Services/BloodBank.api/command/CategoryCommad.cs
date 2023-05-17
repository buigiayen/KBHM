using BloodBank.api.interfaces;
using BloodBank.api.Model;
using Services.lib.Sql;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace BloodBank.api.command
{
    public class CategoryCommad : ICategory
    {
        public CategoryCommad()
        {
          
        }
        public async Task<List<CategoryData>> GetLocation()
        {
            string sql = "select BloodSourceLocationId as value , LOWER(BloodSourceLocationName) as label from tbl_Config_BloodSourceLocation";
           var data = await Dataprovider.db._Query(sql).QueryMapperAsync<CategoryData>();
            return data.ToList();
        }

        public async Task<List<CategoryData>> GetMlBoold()
        {
            string sql = "select Volume as value ,LOWER(Volume)  as label from tbl_BloodVolume";
            var data = await Dataprovider.db._Query(sql).QueryMapperAsync<CategoryData>();
            return data.ToList();
        }
        public async Task<List<CategoryData>> GetElementBoold()
        {
            string sql = "select ElementID as value, LOWER(ElementName)  as label from tbl_Element";
            var data = await Dataprovider.db._Query(sql).QueryMapperAsync<CategoryData>();
            return data.ToList();
        }

    }
}
