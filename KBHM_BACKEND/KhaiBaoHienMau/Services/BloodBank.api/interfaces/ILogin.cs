using BloodBank.api.Model;
using Services.lib.Sql;
using System.Threading.Tasks;

namespace BloodBank.api.interfaces
{
    public interface ILogin
    {
        Task<HttpObject.APIMapper<Login>> AuthorizationAsync(Model.Login login);
    }
}
