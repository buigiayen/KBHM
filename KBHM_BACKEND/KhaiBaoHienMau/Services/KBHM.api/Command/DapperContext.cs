using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System.Data;
using System;

namespace KBHM.api.Command
{
    public class DapperContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString(Environment.GetEnvironmentVariable("SQLCONNECTION"));
        }
        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);
    }
}
