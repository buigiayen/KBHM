using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;

namespace Domain
{
    public class MinIOservices
    {
        public class MinIOModel
        {
            public string bucket { get; set; }
            public List<FileBucketMinio> fileBucketMinios { get; set; }
        }
        public class FileBucketMinio
        {
            public Stream formFile { get; set; }
            public string FileName { get; set; }
            public string FilePath { get; set; }
            public double Size { get; set; }
        }
    }
}
