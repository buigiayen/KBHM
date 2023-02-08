
using KBHM.api.Model;
using Services.lib.Sql;
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


        public Task<HttpObject.APIresult> GetRowIDPerson(Model.Person person)
        {
            throw new System.NotImplementedException();
        }

        public async Task<HttpObject.APIresult> PostPerson(Model.Person person)
        {
            string sql = "Declare @ROWID uniqueidentifier; set @ROWID = newID()" +
              " INSERT INTO [dbo].[Person] ([RowID] ,[Name] ,[BirthDay] ,[Sex] ,[CCCD] ,[Phone] ,[Email]) VALUES (@ROWID ,@Name ,@BrithDay ,@Sex ,@CCCD ,@Phone ,@Email); go ";
            foreach (var item in person.PersonProperties)
            {
                sql += $"INSERT INTO PersonProperties ([ID] ,[Key] ,Label ,value) VALUES ( @ROWID ,'{item.Key}' ,'{item.Label}' ,'{item.value}'); go ";
            }

            return    await Dataprovider.db._Connection(_context.CreateConnection())._Query(sql)._ParamterSQL(person).ExcuteQueryAsync(); ;
        }
    }
}
