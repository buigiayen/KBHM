using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.lib.Sql
{

    public class HttpObject
    {
        public class Enums
        {
            public enum Httpstatuscode_API
            {
                OK = 1,
                ERROR = 0,
                NULL = -2,
                WARN = 2,
            }
        }
        public class APIresult
        {
            public Enums.Httpstatuscode_API code { get; set; } = Enums.Httpstatuscode_API.OK;
            public object Data { get; set; }
            public string Messenger { get; set; } = "Success!";
        }



    }
    public class Dataprovider
    {
        public static readonly Dataprovider db = new Dataprovider();
        private IDbConnection _SqlConnection = new SqlConnection();
        private string _SQL;

        private DynamicParameters _dynamicParameters => new();

        public Dataprovider _Connection(IDbConnection sqlConnection)
        {
            _SqlConnection = sqlConnection;
            return this;
        }
        public Dataprovider _Query(string sql)
        {
            _SQL = sql;
            Logger.Logger.Instance.Messenger(_SQL).build(Logger.Logger._TypeFile.Debug);
            return this;
        }
        private object _Pra;
        public Dataprovider _ParamterSQL(object Pra)
        {
            _Pra = Pra;
            return this;
        }
        public async Task<HttpObject.APIresult> ExcuteQueryAsync()
        {
            int valueTransaction = 0;
            using (var sqlTransaction = _SqlConnection.BeginTransaction())
            {
                try
                {
                    Logger.Logger.Instance.Messenger("start").build(Logger.Logger._TypeFile.Debug);
                    valueTransaction = await _SqlConnection.ExecuteAsync(_SQL, _dynamicParameters ?? null, sqlTransaction);
                    Logger.Logger.Instance.Messenger("Success").build(Logger.Logger._TypeFile.Debug);
                    sqlTransaction.Commit();
                }
                catch (Exception ex)
                {
                    Logger.Logger.Instance.Messenger("stop :" + ex.Message).build(Logger.Logger._TypeFile.Error);
                    sqlTransaction.Rollback();
                    valueTransaction = -2;
                }
            }

            return ReturnStatusObjectSql(valueTransaction);
        }
        public async Task<HttpObject.APIresult> SQLQueryAsync()
        {
            var httpObject = new HttpObject.APIresult();
            try
            {
                Logger.Logger.Instance.Messenger("start").build(Logger.Logger._TypeFile.Debug);
                var data = await _SqlConnection.QueryAsync(_SQL, _Pra ?? null);
                httpObject = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = data, Messenger = "Success!" };
                Logger.Logger.Instance.Messenger("Success").build(Logger.Logger._TypeFile.Debug);
                return httpObject;

            }
            catch (Exception ex)
            {
                Logger.Logger.Instance.Messenger("Stop:" + ex.Message).build(Logger.Logger._TypeFile.Error);
                httpObject = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = null, Messenger = ex.Message };
            }
            return httpObject;
        }
        private HttpObject.APIresult ReturnStatusObjectSql(int status)
        {
            var aPIresultObjects = new HttpObject.APIresult();
            switch (status)
            {
                case -2: aPIresultObjects = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = status, Messenger = "Error, Please check log transaction roll back " }; break;
                case -1: aPIresultObjects = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = status, Messenger = "Error system, Please check log" }; break;
                default: aPIresultObjects = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = status, Messenger = "Success transaction commit" }; break;
            }
            return aPIresultObjects;
        }
    }
}

