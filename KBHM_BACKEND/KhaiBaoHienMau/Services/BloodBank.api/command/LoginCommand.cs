using BloodBank.api.interfaces;
using BloodBank.api.Model;
using Services.lib.authorization;
using Services.lib.Sql;
using System.Threading.Tasks;

namespace BloodBank.api.command
{
    public class LoginCommand : ILogin
    {

        public LoginCommand()
        {
        }
        public async Task<HttpObject.APIMapper<Login>> AuthorizationAsync(Login login)
        {
            HttpObject.APIMapper<Login> aPIMapper = new HttpObject.APIMapper<Login>();
            login.PasswordWeb = await Services.lib.Password.PasswordMD5.Passwordins.ConvertMD5(login.PasswordWeb).Build();
            string sql = "select UserID,UserName,UserQuickCode from tbl_user where  UserID = @UserID and PasswordWeb = @PasswordWeb";

            var ValueQuery = await Dataprovider.db._Query(sql)._ParamterSQL<Login>(login).QueryMapperSingleOrDefaultAsync<Login>();
            if (ValueQuery is not null)
            {
                aPIMapper.code = HttpObject.Enums.Httpstatuscode_API.OK;
                aPIMapper.Data = ValueQuery;
                aPIMapper.Data.Token = jwt.GenerateJSONWebToken(ValueQuery.UserID).ToString();
                aPIMapper.Messenger = "Success!";
            }
            else
            {
                aPIMapper.code = HttpObject.Enums.Httpstatuscode_API.WARN;
                aPIMapper.Data = null;
                aPIMapper.Messenger = "Login: Username and pass is not valid!";
            }

            return aPIMapper;
        }
    }
}
