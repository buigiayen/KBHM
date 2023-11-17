using Minio;
using Services.lib.Http;
using Services.lib.Sql;
using System.api.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace System.api.Command
{
    public class Region : Interfaces.IRegion
    {
        Dataprovider dataprovider;
        public Region(Dataprovider dataprovider)
        {
            this.dataprovider = dataprovider;
        }

        public async Task<HttpObjectData.APIresult> GetAllRegion(int Status, string regionId)
        {
            string sql = "[SP_REGION_VN] @status = 7 , @text = null";
            Dictionary<string, AmdDmTinh> DicTinh = new Dictionary<string, AmdDmTinh>();
            Dictionary<string, AmdDmHuyen> DicHuyen = new Dictionary<string, AmdDmHuyen>();

            var a = await dataprovider.QueryAsync<AmdDmTinh, AmdDmHuyen, AmdDmXa, AmdDmTinh>(sql, null, (a1, a2, a3) =>
            {
                AmdDmTinh dmTinh;
                if (!DicTinh.TryGetValue(a1.MaTinh, out dmTinh))
                {
                    dmTinh = a1;
                    dmTinh.AmdDmHuyen = new List<AmdDmHuyen>();
                    
                    DicTinh.Add(a1.MaTinh, dmTinh);
                }
                AmdDmHuyen dmHuyen;
                if (!DicHuyen.TryGetValue(a2.MaHuyen,out dmHuyen))
                {
                    dmTinh.AmdDmHuyen.Add(a2);
                    dmHuyen = a2;
                    dmHuyen.amdDmXas = new List<AmdDmXa>();
                    DicHuyen.Add(a2.MaHuyen, dmHuyen);
                }

                dmHuyen.amdDmXas.Add(a3);
                return dmTinh;
            },
            "MAHUYEN,MAXA"); ;


            return new HttpObjectData.APIresult { code = HttpObjectData.Enums.Httpstatuscode_API.OK, Data = a, Messenger = "" };

        }

        public async Task<Services.lib.Sql.HttpObject.APIresult> GetRegion(int Status, string regionId)
        {
            string sql = "SP_REGION_VN @STATUS = @status ,@TEXT =@TEXT";

            return await dataprovider.SQLQueryAsync(sql, new
            {
                STATUS = Status,
                TEXT = regionId
            });
        }

        public async Task<HttpObjectData.APIresult> UpdateHuyen(int ID, string value)
        {
            string sql = "update AMD_DM_HUYEN set TEN_HUYEN = @value where MA_Huyen=@ID ";
            return await dataprovider.ExcuteQueryAsync(sql, new
            {
                ID = ID,
                value = value
            });
        }

        public async Task<HttpObjectData.APIresult> UpdateTinh(int ID, string value)
        {
            string sql = "update AMD_DM_TINH set TEN_TINH=@value where ID=@ID";
            return await dataprovider.ExcuteQueryAsync(sql, new
            {
                ID = ID,
                value = value
            });
        }

        public async Task<HttpObjectData.APIresult> UpdateXa(int ID, string value)
        {
            string sql = "update AMD_DM_XA set TEN_XA=@value where Ma_Xa=@ID";
            return await dataprovider.ExcuteQueryAsync(sql, new
            {
                ID = ID,
                value = value
            });
        }
    }
}
