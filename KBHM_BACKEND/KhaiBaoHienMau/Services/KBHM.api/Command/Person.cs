using KBHM.api.Model;
using Microsoft.Identity.Client;
using Services.lib.Http;
using Services.lib.Sql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace KBHM.api.Command
{
    public class Person : Interfaces.Person
    {
        Dataprovider _dataprovider;
        public Person(Dataprovider dataprovider)
        {
            _dataprovider = dataprovider;
        }
        public async Task<HttpObject.APIresult> GetFindPerson(Model.Person person)
        {
            string sql = $"SELECT        TOP (@ROW) * FROM            Person WHERE    Phone=@TEXT or CCCD=@TEXT order by DateRegister desc;";
            return await _dataprovider.SQLQueryAsync(sql, person);
        }
        public async Task<HttpObject.APIresult> GetPerson(Model.Person person)
        {
            string FilterDiemHien = string.IsNullOrEmpty(person.DiemLayMau) ? "" : "and (DiemLayMau = @DiemLayMau)";
            string sql = $" declare @Fdate date;  declare @TDate date; set @Fdate = @FromDate;  set @TDate = @ToDate;   " +
                $" SELECT RowID,Name,BirthDay, Sex, CCCD, Phone , DateRegister,Sync, ChoPhepHienMau, UrlImage, NgheNghiep, DiaChiCoQuan, NgayLayMau, ABO, RH FROM  Person " +
                $"WHERE    (DateRegister between @Fdate and @TDate {FilterDiemHien} ) or (RowID=@RowID or Name=@Name) " +
                $"order by createtime desc;";
            return await _dataprovider.SQLQueryAsync(sql, person);
        }
        public async Task<HttpObject.APIresult> GetRowIDPerson(Model.Person person)
        {
            string sql = $"GetPeronInfo  @ID = @RowID";
            return await _dataprovider.SQLQueryAsync(sql, person);
        }

        public async Task<HttpObject.APIresult> GetRowIDPropertiesPerson(Model.Person person)
        {
            string sql = $"SELECT        TOP (200) * FROM            PersonProperties WHERE        (ID = @RowID);";
            return await _dataprovider.SQLQueryAsync(sql, person);
        }

        public async Task<HttpObject.APIresult> PostPerson(Model.Person person)
        {
            Guid RowsID = Guid.NewGuid();
            if (person.DateRegister == null) { person.DateRegister = DateTime.Now; }
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
              ",[UrlImage]" +
              ",[NgheNghiep]" +
              ",[DiaChiCoQuan]" +
              ",[DiemLayMau]" +
              ",[DateRegister]) " +
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
              ",@UrlImage" +
              ",@NgheNghiep" +
              ",@DiaChiCoQuan" +
              ",@DiemLayMau" +
              ",@DateRegister); ";
            foreach (var item in person.PersonProperties)
            {
                sql += $"INSERT INTO PersonProperties ([ID] ,[Key] ,Label ,value) VALUES ( @ROWIDs ,N'{item.Key}' ,N'{item.Label}' ,N'{item.value}'); ";
            }
            sql += "select @ROWIDs as Code ";
            return await _dataprovider.SQLQueryAsync(sql, person);
        }

        public async Task<HttpObject.APIresult> PutPersonHealthy(Model.Person person)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{person.RowID}';" +
             " UPDATE  [dbo].[Person] set [CanNang]=@CanNang,[ChieuCao]=@ChieuCao,[Mach]=@Mach,[HuyetAp]=@HuyetAp,[TinhTrangLamSang]=@TinhTrangLamSang,[ChoPhepHienMau]=@ChoPhepHienMau,[LuongMauLay]=@LuongMauLay   ,[TamHoan] = @TamHoan      ,[NgayHien] =@NgayHien     ,luongMauCoTheHien=@LuongMauCoTheHien," +
             "[LuongHien] = @LuongHien ,[PhanUng] =@PhanUng,[XuTri]=@XuTri where RowID = @ROWIDs";

            return await _dataprovider.ExcuteQueryAsync(sql, person);
        }

        public async Task<HttpObject.APIresult> PutPersonTip(Model.Person person)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{person.RowID}';" +
         " UPDATE  [dbo].[Person] set [MaTuiMau]=@MaTuiMau , LoaiHienThanhPhan=@LoaiHienThanhPhan, DiemLayMau=@DiemLayMau, NgayHien=@NgayHien, Sync=@SyncData,NguoiLayMau=@NguoiLayMau, NgayLayMau=GetDate() where RowID = @ROWIDs";

            return await _dataprovider.ExcuteQueryAsync(sql, person);

        }
        public async Task<HttpObject.APIresult> PutPersonDone(Model.Person person)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{person.RowID}';" +
         " UPDATE  [dbo].[Person] set [LuongHien]=@LuongHien , PhanUng=@PhanUng, XuTri=@XuTri, Sync=@SyncData, NguoiDongBo=@NguoiDongBo where RowID = @ROWIDs";
            return await _dataprovider.ExcuteQueryAsync(sql, person);
        }

        public async Task<HttpObject.APIresult> PutPerson(Model.Person person)
        {
            string sql = $"Declare @ROWIDs uniqueidentifier; set @ROWIDs = '{person.RowID}';" +
              " UPDATE  [dbo].[Person] set " +
              " [Name] = @Name," +
              " [Sex] = @Sex ," +
              " [CCCD]=@CCCD ," +
              " [Phone]=@Phone ," +
              " [Email]=@Email, " +
              " [DiaChiThuongTru]=@DiaChiThuongTru," +
              " [DiaChiThuongTru_ChiTiet]=@DiaChiThuongTru_ChiTiet ," +
              " [DiaChiLienLac]=@DiaChiLienLac ," +
              " [DiaChiThuongLienLac_ChiTiet]=@DiaChiThuongLienLac_ChiTiet ," +
              " [NoiCapCCCD]=@NoiCapCCCD ," +
              " [UrlImage]=@UrlImage," +
              " [NgheNghiep]=@NgheNghiep," +
              " [DiaChiCoQuan]=@DiaChiCoQuan," +
              " [BirthDay] = @BirthDay" +
              " where RowID = @ROWIDs";
            return await _dataprovider.ExcuteQueryAsync(sql, person);
        }

        public async Task<IEnumerable<Model.Person>> GetPersonInfo()
        {
            string sql = "SELECT   * FROM  Person as p INNER JOIN PersonProperties as pp ON p.RowID = pp.ID";
            Dictionary<Guid, Model.Person> people = new Dictionary<Guid, Model.Person>();

            var test = await _dataprovider.QueryAsync<Model.Person, Model.PersonProperties, Model.Person>(sql, null,
             (t1, t2) =>
            {
                Model.Person person;
                if (!people.TryGetValue(t1.RowID, out person))
                {
                    person = t1;
                    person.PersonProperties = new List<PersonProperties>();
                    people.Add(person.RowID, person);
                }
                person.PersonProperties.Add(t2);
                return person;
            });

            return test;


        }

        public async Task<HttpObjectData.APIresult> PutPersonABORH(Model.Person person)
        {
            string sql = "update Person set ABO=@ABO , RH=@RH where RowID=@RowID";
            return await _dataprovider.ExcuteQueryAsync(sql, person);
        }
    }
}
