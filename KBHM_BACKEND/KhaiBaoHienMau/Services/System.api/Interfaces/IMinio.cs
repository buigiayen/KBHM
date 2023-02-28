using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace System.api.Interfaces
{
    public interface IMinio
    {
        Task<List<Domain.MinIOservices.MinIOModel>> GetAllBucket();
        Task<List<MinIOservices.FileBucketMinio>> PostFileasync(MinIOservices.FileBucketMinio uploadMinios, string bucket);
        Task<List<MinIOservices.MinIOModel>> GetFileBucketasync(MinIOservices.MinIOModel uploadMinios);
    }
}
