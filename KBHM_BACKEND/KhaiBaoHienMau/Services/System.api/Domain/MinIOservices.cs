﻿using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

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
            public IFormFile formFile { get; set; }
            public string FileName { get; set; }
            public string FilePath { get; set; }
            public double Size { get; set; }
        }
    }
}
