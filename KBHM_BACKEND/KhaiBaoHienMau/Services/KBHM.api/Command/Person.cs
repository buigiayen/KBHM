
using KBHM.api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Writers;
using Services.lib.Sql;
using System;
using System.Threading.Tasks;

namespace KBHM.api.Command
{
    public class Person : Interfaces.Person
    {
        public async Task<HttpObject.APIresult> GetFindPerson(Model.Person person)
        {
            string sql = $"SELECT        TOP (@ROW) * FROM            Person WHERE    Phone=@TEXT or CCCD=@TEXT order by DateRegister desc;";
            return await Dataprovider.db._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }
        public async Task<HttpObject.APIresult> GetPerson(Model.Person person)
        {
            string sql = $" declare @Fdate date;  declare @TDate date; set @Fdate = @FromDate;  set @TDate = @ToDate;   " +
                $" SELECT RowID,Name,BirthDay, Sex, CCCD, Phone , DateRegister,Sync, ChoPhepHienMau, UrlImage FROM  Person " +
                $"WHERE    (DateRegister between @Fdate and @TDate) or (RowID=@RowID or Name=@Name) " +
                $"order by DateRegister desc;";
            return await Dataprovider.db._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }
        public async Task<HttpObject.APIresult> GetRowIDPerson(Model.Person person)
        {
            string sql = $"GetPeronInfo  @ID = @RowID";
            return await Dataprovider.db._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }

        public async Task<HttpObject.APIresult> GetRowIDPropertiesPerson(Model.Person person)
        {
            string sql = $"SELECT        TOP (200) * FROM            PersonProperties WHERE        (ID = @RowID);";
            return await Dataprovider.db._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }

        public async Task<HttpObject.APIresult> PostPerson(Model.Person person)
        {
            Guid RowsID = Guid.NewGuid();
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{RowsID}';" +
              " INSERT INTO [dbo].[Person] ([RowID]" +
              ",[Name] " +
              ",[BirthDay] " +
              ",[Sex]" +
              ",[CCCD]" +
              ",[Phone]" +
              ",[Email]" +
              ",[DiaChiThuongTru]" +
              ",[DiaChiThuongTru_ChiTiet]" +
              ",[DiaChiLienLac] " +
              ",[DiaChiThuongLienLac_ChiTiet] " +
              ",[NoiCapCCCD]" +
              ",[UrlImage]) " +
              " VALUES " +
              "(@ROWIDs " +
              ",@Name " +
              ",@BirthDay " +
              ",@Sex " +
              ",@CCCD " +
              ",@Phone " +
              ",@Email" +
              ",@DiaChiThuongTru" +
              ",@DiaChiThuongTru_ChiTiet" +
              ",@DiaChiLienLac" +
              ",@DiaChiThuongLienLac_ChiTiet" +
              ",@NoiCapCCCD" +
              ",@UrlImage); ";
            foreach (var item in person.PersonProperties)
            {
                sql += $"INSERT INTO PersonProperties ([ID] ,[Key] ,Label ,value) VALUES ( @ROWIDs ,N'{item.Key}' ,N'{item.Label}' ,N'{item.value}'); ";
            }
            sql += "select @ROWIDs as Code ";
            return await Dataprovider.db._Query(sql)._ParamterSQL(person).SQLQueryAsync();
        }

        public async Task<HttpObject.APIresult> PutPersonHealthy(Model.Person person)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{person.RowID}';" +
             " UPDATE  [dbo].[Person] set [CanNang]=@CanNang,[ChieuCao]=@ChieuCao,[Mach]=@Mach,[HuyetAp]=@HuyetAp,[TinhTrangLamSang]=@TinhTrangLamSang,[ChoPhepHienMau]=@ChoPhepHienMau,[LuongMauLay]=@LuongMauLay   ,[TamHoan] = @TamHoan      ,[NgayHien] =@NgayHien     ,luongMauCoTheHien=@LuongMauCoTheHien," +
             "[LuongHien] = @LuongHien ,[PhanUng] =@PhanUng,[XuTri]=@XuTri where RowID = @ROWIDs";

            return await Dataprovider.db._Query(sql)._ParamterSQL(person).ExcuteQueryAsync();
        }

        public async Task<HttpObject.APIresult> PutPersonTip(Model.Person person)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{person.RowID}';" +
         " UPDATE  [dbo].[Person] set [MaTuiMau]=@MaTuiMau , LoaiHienThanhPhan=@LoaiHienThanhPhan, DiemLayMau=@DiemLayMau, NgayHien=@NgayHien, Sync=@SyncData where RowID = @ROWIDs";

            return await Dataprovider.db._Query(sql)._ParamterSQL(person).ExcuteQueryAsync();

        }
        public async Task<HttpObject.APIresult> PutPersonDone(Model.Person person)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{person.RowID}';" +
         " UPDATE  [dbo].[Person] set [LuongHien]=@LuongHien , PhanUng=@PhanUng, XuTri=@XuTri, Sync=@SyncData where RowID = @ROWIDs";

            return await Dataprovider.db._Query(sql)._ParamterSQL(person).ExcuteQueryAsync();

        }

        public async Task<HttpObject.APIresult> PutPerson(Model.Person person)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{person.RowID}';" +
              " UPDATE  [dbo].[Person] set " +
              " [Name] = @Name," +
              " [BirthDay] = @BirthDay ," +
              " [Sex] = @Sex ," +
              " [CCCD]=@CCCD ," +
              " [Phone]=@Phone ," +
              " [Email]=@Email, " +
              " [DiaChiThuongTru]=@DiaChiThuongTru," +
              " [DiaChiThuongTru_ChiTiet]=@DiaChiThuongTru_ChiTiet ," +
              " [DiaChiLienLac]=@DiaChiLienLac ," +
              " [DiaChiThuongLienLac_ChiTiet]=@DiaChiThuongLienLac_ChiTiet ," +
              " [NoiCapCCCD]=@NoiCapCCCD ," +
              " [UrlImage]=@UrlImage" +
              " where RowID = @ROWIDs";
            return await Dataprovider.db._Query(sql)._ParamterSQL(person).ExcuteQueryAsync();
        }
    }
}
