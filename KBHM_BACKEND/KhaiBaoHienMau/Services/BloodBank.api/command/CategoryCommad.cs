using BloodBank.api.interfaces;
using BloodBank.api.Model;
using Services.lib.Sql;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodBank.api.command
{
    public class CategoryCommad : ICategory
    {
        Dataprovider dataprovider;
        public CategoryCommad(Dataprovider dataprovider)
        {
            this.dataprovider = dataprovider;
        }
        public async Task<List<CategoryData>> GetLocation()
        {
            string sql = "select BloodSourceLocationId as value , LOWER(BloodSourceLocationName) as label from tbl_Config_BloodSourceLocation";
            var data = await dataprovider.QueryMapperAsync<CategoryData>(sql);
            return data.ToList();
        }

        public async Task<List<CategoryData>> GetMlBoold()
        {
            string sql = "select Volume as value ,LOWER(Volume)  as label from tbl_BloodVolume Where AllowDonate = 1";
            var data = await dataprovider.QueryMapperAsync<CategoryData>(sql);
            return data.ToList();
        }
        public async Task<List<CategoryData>> GetElementBoold()
        {
            string sql = "select ElementID as value, LOWER(ElementName)  as label from tbl_Element Where AllowDonate = 1";
            var data = await dataprovider.QueryMapperAsync<CategoryData>(sql);
            return data.ToList();
        }
        public async Task<List<CategoryData>> GetJob()
        {
            string sql = "select JobID as value, UPPER(JobName)  as label from tbl_Job";
            var data = await dataprovider.QueryMapperAsync<CategoryData>(sql);
            return data.ToList();
        }
        public async Task<List<CategoryData>> GetDoctor()
        {
            string sql = "Select DoctorID as value, UPPER(DoctorName) as label from tbl_Doctor";
            var data = await dataprovider.QueryMapperAsync<CategoryData>(sql);
            return data.ToList();
        }
        public async Task<List<CategoryData>> GetTrip()
        {
            string sql = " Select TripID as value, UPPER(TripName) as label from tbl_Trip";
            var data = await dataprovider.QueryMapperAsync<CategoryData>(sql);
            return data.ToList();
        }
        public async Task<List<CategoryData>> GetBloodSource()
        {
            string sql = " Select SourceID as value, UPPER(SourceName) as label from tbl_BloodSource ";
            var data = await dataprovider.QueryMapperAsync<CategoryData>(sql);
            return data.ToList();
        }
    }
}
