using System;
using System.Threading.Tasks;

namespace Services.lib.Password
{
    public class PasswordMD5
    {
        public static PasswordMD5 Passwordins = new();
        private string _Password { get; set; }
        public PasswordMD5 ConvertMD5(string Password)
        {
            _Password = Password;
            return this;
        }
        public async Task<string> Build()
        {
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(_Password);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                return Convert.ToHexString(hashBytes);
            }
        }
    }
}
