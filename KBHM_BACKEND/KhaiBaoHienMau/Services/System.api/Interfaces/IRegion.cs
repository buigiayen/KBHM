using Services.lib.Sql;
using System.Threading.Tasks;

namespace System.api.Interfaces
{
    public interface IRegion
    {
        Task<HttpObject.APIresult> GetRegion(int Status,string regionId);
    }
}
