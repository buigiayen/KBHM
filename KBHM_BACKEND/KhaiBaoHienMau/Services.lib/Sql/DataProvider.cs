using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Services.lib.Http;
using System.Data;
using System.Data.Common;
using System.Reflection;
using System.Reflection.Metadata;
using System.Text.Json;

namespace Services.lib.Sql
{
    public static class DapperExtensions
    {
        public static string ArgsAsSql(this DynamicParameters args)
        {
            if (args is null) throw new ArgumentNullException(nameof(args));
            var sb = new StringBuilder();
            foreach (var name in args.ParameterNames)
            {
                var pValue = args.Get<dynamic>(name);

                var type = pValue.GetType();

                if (type == typeof(DateTime))
                    sb.AppendFormat("DECLARE @{0} DATETIME ='{1}'\n", name, pValue.ToString("yyyy-MM-dd HH:mm:ss.fff"));
                else if (type == typeof(bool))
                    sb.AppendFormat("DECLARE @{0} BIT = {1}\n", name, (bool)pValue ? 1 : 0);
                else if (type == typeof(int))
                    sb.AppendFormat("DECLARE @{0} INT = {1}\n", name, pValue);
                else if (type == typeof(List<int>))
                    sb.AppendFormat("-- REPLACE @{0} IN SQL: ({1})\n", name, string.Join(",", (List<int>)pValue));
                else
                    sb.AppendFormat("DECLARE @{0} NVARCHAR(MAX) = '{1}'\n", name, pValue.ToString());
            }
            return sb.ToString();
        }
    }
    public class HttpObject : HttpObjectData
    {

    }
    public class Dataprovider
    {
        IDbConnection _IdbConnection;
        ILogger<Dataprovider> _Logger;
        public Dataprovider(ILogger<Dataprovider> Logger, IDbConnection IdbConnection)
        {
            _Logger = Logger;
            _IdbConnection = IdbConnection;
        }
        private void CheckLogPramter(string _SQL, object Pra)
        {
            try
            {
                string log = "";
                Type type = (Pra).GetType();
                if (type != default)
                {
                    PropertyInfo[] properties = type.GetProperties(BindingFlags.Instance | BindingFlags.Public);
                    foreach (var x in properties)
                    {
                        if (x.GetValue(Pra) == null)
                        {
                            log += Environment.NewLine + ($"declare @{x.Name} {GetSqlDbType(x.PropertyType)} ; set @{x.Name} = null");
                        }
                        else
                        {
                            SqlDbType sqlDbType = GetSqlDbType(x.PropertyType);
                            var Value = x.GetValue(Pra);
                            string valueProps = sqlDbType.ToString().ToLower().Contains("char") ? $"'{Value.ToString()}'" : Value.ToString();
                            log += Environment.NewLine + (string.Format($"declare @{x.Name} {sqlDbType.ToString()}({Value.ToString().Length}) ; set  @{x.Name} = {valueProps}"));
                        }
                    }
                    log += Environment.NewLine + _SQL;
                    _Logger.LogInformation($"SQL {log} ");
                }
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex.Message);
            }
        }
        private SqlDbType GetSqlDbType(Type type)
        {
            var typeMap = new Dictionary<Type, SqlDbType>
            {
                { typeof(string), SqlDbType.NVarChar },
                { typeof(int), SqlDbType.Int },
                { typeof(bool), SqlDbType.Bit },
                { typeof(DateTime), SqlDbType.DateTime },
                // Thêm các kiểu dữ liệu khác và SqlDbType tương ứng tùy theo yêu cầu của bạn
        };
            if (typeMap.TryGetValue(type, out SqlDbType sqlDbType))
            {
                return sqlDbType;
            }
            return SqlDbType.NVarChar;
        }
        public async Task<HttpObject.APIresult> ExcuteQueryAsync(string _SQL, object Prameter = null)
        {
            int valueTransaction = 0;
            if (_IdbConnection.State == ConnectionState.Closed)
            {
                _IdbConnection.Open();
            }
            using (var sqlTransaction = _IdbConnection.BeginTransaction())
            {
                try
                {
                    CheckLogPramter(_SQL, Prameter);
                    valueTransaction = await _IdbConnection.ExecuteAsync(_SQL, Prameter ?? null, sqlTransaction);
                    sqlTransaction.Commit();
                    return ReturnStatusObjectSql(valueTransaction);
                }
                catch (Exception ex)
                {
                    sqlTransaction.Rollback();
                    valueTransaction = -2;
                    return ReturnStatusObjectSql(valueTransaction, ex);
                }
            }
        }
        public async Task<T> QueryMapperSingleOrDefaultAsync<T>(string _SQL, object Prameter = null) where T : class
        {
            T Tcontext = default(T);
            CheckLogPramter(_SQL, Prameter);
            Tcontext = await _IdbConnection.QuerySingleOrDefaultAsync<T>(_SQL, Prameter ?? null);

            return Tcontext;
        }
        public async Task<IEnumerable<T>> QueryMapperAsync<T>(string _SQL, object Prameter = null) where T : class
        {
            IEnumerable<T> Tcontext = default(IEnumerable<T>);
            CheckLogPramter(_SQL, Prameter);
            Tcontext = await _IdbConnection.QueryAsync<T>(_SQL, Prameter ?? null);
            return Tcontext;
        }
        public async Task<HttpObject.APIresult> SQLQueryAsync(string _SQL, object Prameter = null)
        {

            var httpObject = new HttpObject.APIresult();
            try
            {
                CheckLogPramter(_SQL, Prameter);
                var data = await _IdbConnection.QueryAsync(_SQL, Prameter ?? null);
                httpObject = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = data, Messenger = "Success!" };
                return httpObject;
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex.Message);
                httpObject = new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = null, Messenger = ex.Message };
            }
            return httpObject;
        }
        public async Task<HttpObject.APIMapper<dynamic>> SingleOrDefaultAsync(string _SQL, object Prameter = null)
        {

            var httpObject = new HttpObject.APIMapper<object>();
            try
            {
                CheckLogPramter(_SQL, Prameter);
                var data = await _IdbConnection.QuerySingleOrDefaultAsync(_SQL, Prameter ?? null);

                httpObject = new HttpObject.APIMapper<dynamic> { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = data, Messenger = "Success!" };
                return httpObject;
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex.Message);
                httpObject = new HttpObject.APIMapper<dynamic> { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = null, Messenger = ex.Message };
            }
            return httpObject;
        }
        public async Task<HttpObject.APIMapper<T>> SingleOrDefaultAsync<T>(string _SQL, object Prameter = null) where T : class
        {
            var httpObject = new HttpObject.APIMapper<T>();
            try
            {
                CheckLogPramter(_SQL, Prameter);
                var data = await _IdbConnection.QuerySingleOrDefaultAsync(_SQL, Prameter ?? null);
                httpObject = new HttpObject.APIMapper<T> { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = data, Messenger = "Success!" };
                return httpObject;
            }
            catch (Exception ex)
            {
                httpObject = new HttpObject.APIMapper<T> { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = null, Messenger = ex.Message };
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

