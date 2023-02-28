using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Channels;
using System.Threading.Tasks;
using static Services.lib.Sql.HttpObject;

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
        public class APIresult : API
        {
            public object Data { get; set; }
        }
        public class APIMapper<T> : API where T : class
        {
            public T Data { get; set; }
        }
        public class API : Enums
        {
            public Httpstatuscode_API code { get; set; } = Httpstatuscode_API.OK;
            public string Messenger { get; set; } = "Success!";
        }
    }
    public class Dataprovider
    {
        public static readonly Dataprovider db = new Dataprovider();
        private SqlConnection _SqlConnection = null;
        private string _SQL;
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
            string log = "Pra";
            if (Pra != default)
            {
                log = JsonSerializer.Serialize(Pra);
            }
            Logger.Logger.Instance.Messenger(log).build(Logger.Logger._TypeFile.Debug);
            return this;
        }
        public async Task<HttpObject.APIresult> ExcuteQueryAsync()
        {
            int valueTransaction = 0;
            using (_SqlConnection = new SqlConnection(Environment.GetEnvironmentVariable("SQLCONNECTION")))
            {
                _SqlConnection.Open();
                using (var sqlTransaction = _SqlConnection.BeginTransaction())
                {
                    try
                    {
                        Logger.Logger.Instance.Messenger("start").build(Logger.Logger._TypeFile.Debug);
                        valueTransaction = await _SqlConnection.ExecuteAsync(_SQL, _Pra ?? null, sqlTransaction);
                        Logger.Logger.Instance.Messenger("Success").build(Logger.Logger._TypeFile.Debug);
                        sqlTransaction.Commit();
                        _SqlConnection.Close();
                        return ReturnStatusObjectSql(valueTransaction);
                    }
                    catch (Exception ex)
                    {
                        Logger.Logger.Instance.Messenger("stop :" + ex.Message).build(Logger.Logger._TypeFile.Error);
                        sqlTransaction.Rollback();
                        valueTransaction = -2;
                        _SqlConnection.Close();
                        return ReturnStatusObjectSql(valueTransaction, ex);
                    }
                }
            }


        }
        public async Task<T> QueryMapper<T>() where T : class
        {
            T Tcontext = default(T);
            using (_SqlConnection = new SqlConnection(Environment.GetEnvironmentVariable("SQLCONNECTION")))
            {
              
                Logger.Logger.Instance.Messenger("start").build(Logger.Logger._TypeFile.Debug);
                Tcontext = await _SqlConnection.QuerySingleOrDefaultAsync<T>(_SQL, _Pra ?? null);
                Logger.Logger.Instance.Messenger("Success").build(Logger.Logger._TypeFile.Debug);
              
            }

            return Tcontext;
        }
        public async Task<HttpObject.APIresult> SQLQueryAsync()
        {
            var httpObject = new HttpObject.APIresult();
            try
            {
                using (_SqlConnection = new SqlConnection(Environment.GetEnvironmentVariable("SQLCONNECTION")))
                {
                     _SqlConnection.Open();
                    Logger.Logger.Instance.Messenger("start").build(Logger.Logger._TypeFile.Debug);
                    var data = await _SqlConnection.QueryAsync(_SQL, _Pra ?? null);
                    httpObject = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = data, Messenger = "Success!" };
                    Logger.Logger.Instance.Messenger("Success").build(Logger.Logger._TypeFile.Debug);
                    _SqlConnection.Close();
                }

                return httpObject;
            }
            catch (Exception ex)
            {
                Logger.Logger.Instance.Messenger("Stop:" + ex.Message).build(Logger.Logger._TypeFile.Error);
                httpObject = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = null, Messenger = ex.Message };
            }

            return httpObject;
        }
        private HttpObject.APIresult ReturnStatusObjectSql(int status, Exception exception = null)
        {
            var aPIresultObjects = new HttpObject.APIresult();
            switch (status)
            {
                case -2: aPIresultObjects = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = status, Messenger = "Error, Please check log transaction roll back: " + exception ?? exception.Message }; break;
                case -1: aPIresultObjects = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = status, Messenger = "Error system, Please check log" + exception ?? exception.Message }; break;
                default: aPIresultObjects = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = status, Messenger = "Success transaction commit" }; break;
            }
            return aPIresultObjects;
        }

    }
}

