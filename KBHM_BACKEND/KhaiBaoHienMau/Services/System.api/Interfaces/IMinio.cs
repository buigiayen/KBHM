using Domain;
using Services.lib.Sql;
using System.Threading.Tasks;

namespace System.api.Interfaces
{
    public interface IMinio
    {

        Task<HttpObject.APIMapper<MinIOservices.FileBucketMinio>> PostFileasync(MinIOservices.FileBucketMinio uploadMinios, string bucket);
        Task<HttpObject.APIresult> GetFileBucketasync(MinIOservices.MinIOModel uploadMinios);
        Task<HttpObject.APIresult> DownLoadFileBucketAsync(MinIOservices.MinIOModel uploadMinios);
    }
}
