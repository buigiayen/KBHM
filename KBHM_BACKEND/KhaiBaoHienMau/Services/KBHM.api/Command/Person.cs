﻿
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

        public async Task<HttpObject.APIresult> GetFindPerson(Model.Person person)
        {
            string sql = $"SELECT        TOP (@ROW) * FROM            Person WHERE    Phone=@TEXT or CCCD=@TEXT order by DateRegister desc;";
            return await Dataprovider.db._Connection(_context.CreateConnection())._Query(sql)._ParamterSQL(person).SQLQueryAsync();
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
              " INSERT INTO [dbo].[Person] ([RowID] ,[Name] ,[BirthDay] ,[Sex] ,[CCCD] ,[Phone] ,[Email], [DiaChiThuongTru],[DiaChiThuongTru_ChiTiet] , [DiaChiLienLac] , [DiaChiThuongLienLac_ChiTiet] , [NoiCapCCCD]) VALUES (@ROWIDs ,@Name ,@BirthDay ,@Sex ,@CCCD ,@Phone ,@Email, @DiaChiThuongTru, @DiaChiThuongTru_ChiTiet  , @DiaChiLienLac ,@DiaChiThuongLienLac_ChiTiet,@NoiCapCCCD); ";
            foreach (var item in person.PersonProperties)
            {
                sql += $"INSERT INTO PersonProperties ([ID] ,[Key] ,Label ,value) VALUES ( @ROWIDs ,N'{item.Key}' ,N'{item.Label}' ,N'{item.value}'); ";
            }
            sql += "select @ROWIDs as Code ";
            return await Dataprovider.db._Connection(_context.CreateConnection())._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }

        public async Task<HttpObject.APIresult> PutPerson(Model.Person person)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{person.RowID}';" +
             " UPDATE  [dbo].[Person] set [CanNang]=@CanNang,[ChieuCao]=@ChieuCao,[Mach]=@Mach,[HuyetAp]=@HuyetAp,[TinhTrangLamSang]=@TinhTrangLamSang,[ChoPhepHienMau]=@ChoPhepHienMau,[LuongMauLay]=@LuongMauLay   ,[TamHoan] = @TamHoan      ,[NgayHien] =@NgayHien     ,luongMauCoTheHien=@LuongMauCoTheHien," +
             "[LuongHien] = @LuongHien ,[PhanUng] =@PhanUng,[XuTri]=@XuTri where RowID = @ROWIDs";

            return await Dataprovider.db._Connection(_context.CreateConnection())._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }
    }
}