using Services.lib.Sql;
using System.Threading.Tasks;

namespace BloodBank.api.interfaces
{
    public interface ICategory
    {
        Task<HttpObject.API> GetLocation();
        Task<HttpObject.API> GetMlBoold();

    }
}
