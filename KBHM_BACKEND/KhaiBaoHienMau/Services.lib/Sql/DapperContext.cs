using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Services.lib.Sql
{
    public interface IConnection
    {
        IDbConnection CreateConnection();
    }
    public class DapperContext : IConnection
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = Environment.GetEnvironmentVariable("SQLCONNECTION");
        }
        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);
    }
}
