using Services.lib.Sql;
using System.Threading.Tasks;

namespace BloodBank.api.interfaces
{
    public interface ILogin
    {
        Task<HttpObject.APIresult> AuthorizationAsync(Model.Login login);
    }
}
