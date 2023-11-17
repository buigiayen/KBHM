using Services.lib.Sql;
using System.Threading.Tasks;

namespace System.api.Interfaces
{
    public interface IRegion
    {
        Task<HttpObject.APIresult> GetRegion(int Status, string regionId);
        Task<HttpObject.APIresult> GetAllRegion(int Status, string regionId);
        Task<HttpObject.APIresult> UpdateXa(int ID, string value);
        Task<HttpObject.APIresult> UpdateHuyen(int ID, string value);
        Task<HttpObject.APIresult> UpdateTinh(int ID, string value);
    }
}
