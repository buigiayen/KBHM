using BloodBank.api.interfaces;
using BloodBank.api.Model;
using Services.lib.Sql;
using System.Threading.Tasks;

namespace BloodBank.api.command
{
    public class LoginCommand : ILogin
    {
        public async Task<HttpObject.APIresult> AuthorizationAsync(Login login)
        {
            throw new System.NotImplementedException();
        }
    }
}
