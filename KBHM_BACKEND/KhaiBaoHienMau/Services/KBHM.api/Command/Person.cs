
using KBHM.api.Model;
using Microsoft.OpenApi.Writers;
using Services.lib.Sql;
using System;
using System.Threading.Tasks;

namespace KBHM.api.Command
{
    public class Person : Interfaces.Person
    {
        private readonly IConnection _context;
        public Person(IConnection context)
        {
            _context = context;
        }


        public async Task<HttpObject.APIresult> GetRowIDPerson(Model.Person person)
        {
            
            string sql = $"SELECT        TOP (200) * FROM            Person WHERE        (RowID = @RowID);";
            return await Dataprovider.db._Connection(_context.CreateConnection())._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }

        public async Task<HttpObject.APIresult> GetRowIDPropertiesPerson(Model.Person person)
        {
            string sql = $"SELECT        TOP (200) * FROM            PersonProperties WHERE        (ID = @RowID);";
            return await Dataprovider.db._Connection(_context.CreateConnection())._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }

        public async Task<HttpObject.APIresult> PostPerson(Model.Person person)
        {
            Guid RowsID = Guid.NewGuid();
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{RowsID}';" +
              " INSERT INTO [dbo].[Person] ([RowID] ,[Name] ,[BirthDay] ,[Sex] ,[CCCD] ,[Phone] ,[Email]) VALUES (@ROWIDs ,@Name ,@BirthDay ,@Sex ,@CCCD ,@Phone ,@Email); ";
            foreach (var item in person.PersonProperties)
            {
                sql += $"INSERT INTO PersonProperties ([ID] ,[Key] ,Label ,value) VALUES ( @ROWIDs ,N'{item.Key}' ,N'{item.Label}' ,N'{item.value}'); ";
            }
            sql += "select @ROWIDs as Code ";
            return  await Dataprovider.db._Connection(_context.CreateConnection())._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }
    }
}
