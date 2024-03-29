﻿using Minio;

namespace System.api.infrastructure
{
    public class MinioContext
    {
        public string Endpoin;
        public int PORT;
        public string PORT_GW;
        private string ACCESSKEY;
        private string SecretKey;
        public bool HTTPS = false;

        public MinioContext()
        {
            string config = Environment.GetEnvironmentVariable("MINIO_CONNECTION");
            Console.WriteLine(config);
            try
            {
                string[] splitConfig = config.Split(';');
                Endpoin = splitConfig[0];
                PORT = Convert.ToInt32(splitConfig[1]);
                ACCESSKEY = splitConfig[2];
                SecretKey = splitConfig[3];
                HTTPS = Convert.ToBoolean(splitConfig[4]);
                PORT_GW = splitConfig[5];
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
