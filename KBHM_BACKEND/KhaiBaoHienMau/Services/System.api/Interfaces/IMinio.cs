using Domain;
using Services.lib.Sql;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace System.api.Interfaces
{
    public interface IMinio
    {
        Task<HttpObject.APIresult> GetAllBucket();
        Task<HttpObject.APIMapper<MinIOservices.FileBucketMinio>> PostFileasync(MinIOservices.FileBucketMinio uploadMinios, string bucket);
        Task<HttpObject.APIresult> GetFileBucketasync(MinIOservices.MinIOModel uploadMinios);
    }
}
