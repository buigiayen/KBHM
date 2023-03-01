using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Minio;

namespace System.api.infrastructure
{
    public class MinioContext
    {
        private readonly IConfiguration _configuration;
        public string Endpoin;
        public int PORT;
        private string ACCESSKEY;
        private string SecretKey;
        public bool HTTPS = false;

        public MinioContext(IConfiguration configuration)
        {
            _configuration = configuration;
            string config = Environment.GetEnvironmentVariable("MINIO_CONNECTION");
            try
            {
                string[] splitConfig = config.Split(';');
                Endpoin = splitConfig[0];
                PORT = Convert.ToInt32(splitConfig[1]);
                ACCESSKEY = splitConfig[2];
                SecretKey = splitConfig[3];
                HTTPS = Convert.ToBoolean(splitConfig[4]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public MinioClient CreateConnection()
            => new MinioClient().WithEndpoint(Endpoin, PORT).WithCredentials(ACCESSKEY, SecretKey).WithSSL(HTTPS).Build();

    }


}
