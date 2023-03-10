using Minio.DataModel;
using Minio.Exceptions;
using Minio;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using System.Threading;
using System.api.Interfaces;
using System.api.infrastructure;
using Domain;
using System.Reactive.Linq;
using System.Net.Sockets;
using Microsoft.Extensions.Logging;
using Services.lib.Logger;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;
using System.Net.WebSockets;
using Services.lib.Sql;
using static Domain.MinIOservices;

namespace System.api.Command
{
    public class MinioCommand : Interfaces.IMinio
    {
        private readonly MinioContext _Minioct;
        public MinioCommand(MinioContext Minioct)
        {
            _Minioct = Minioct;
        }
        public async Task<HttpObject.APIresult> GetAllBucket()
        {
            try
            {
                List<MinIOservices.MinIOModel> minIOModels = new List<MinIOservices.MinIOModel>();
                var ListBucket = await _Minioct.CreateConnection().ListBucketsAsync();
                foreach (Bucket bucket in ListBucket.Buckets)
                {
                    minIOModels.Add(new MinIOservices.MinIOModel
                    {
                        bucket = bucket.Name,
                    });
                }
                return new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = minIOModels, Messenger = "Succes" };

            }
            catch (MinioException ex)
            {
                Logger.Instance.Messenger(ex.Message).build(Logger._TypeFile.Error);
                return new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = null, Messenger = ex.Message };
            }


        }
        public async Task<HttpObject.APIresult> GetFileBucketasync(MinIOservices.MinIOModel uploadMinios)
        {
            List<MinIOservices.MinIOModel> MinioBucket = new List<MinIOservices.MinIOModel>();
            List<MinIOservices.FileBucketMinio> fileBuckets = new List<MinIOservices.FileBucketMinio>();
            try
            {
                var minioFilebucket = _Minioct.CreateConnection().ListObjectsAsync(uploadMinios.bucket, recursive: true).ToList();
                minioFilebucket.Subscribe(
                   item =>
                   {
                       foreach (var xx in item)
                       {
                           fileBuckets.Add(new MinIOservices.FileBucketMinio
                           {
                               FileName = xx.Key,
                               Size = xx.Size,
                               FilePath = _Minioct.HTTPS ? "https://" : "http://" + string.Format("{0}:{1}/{2}/{3}", _Minioct.Endpoin, _Minioct.PORT, uploadMinios.bucket, xx.Key),
                           });
                       }
                   },
                   ex => Console.WriteLine("OnError: {0}", ex.Message),
                   () => Console.WriteLine("OnComplete: {0}"));
                Thread.Sleep(5000);
                MinioBucket.Add(new MinIOservices.MinIOModel { bucket = uploadMinios.bucket, fileBucketMinios = fileBuckets });
                return new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = MinioBucket, Messenger = "Succes" }; ;
            }
            catch (MinioException ex)
            {
                Logger.Instance.Messenger(ex.Message).build(Logger._TypeFile.Error);
                return new HttpObject.APIresult { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = null, Messenger = ex.Message };
            }


        }
        public async Task<HttpObject.APIMapper<MinIOservices.FileBucketMinio>> PostFileasync(MinIOservices.FileBucketMinio uploadMinios, string bucket)
        {


            var bucketName = bucket?.ToLower() ?? "newfolder";
            var objectName = uploadMinios.formFile.FileName;
            try
            {
                bool found = await _Minioct.CreateConnection().BucketExistsAsync(bucketName);
                if (!found)
                {
                    await _Minioct.CreateConnection().MakeBucketAsync(bucketName);

                }
                string Dir = AppDomain.CurrentDomain.BaseDirectory + "/Upload";
                string FilePath = Path.Combine(Dir, objectName);
                Directory.CreateDirectory(Dir);
                using (var FileCreate = File.Create(FilePath))
                {
                    await uploadMinios?.formFile.CopyToAsync(FileCreate);
                    FileCreate.Dispose();
                }

                // Upload a file to bucket.
                using (var fileStream = new MemoryStream())
                {
                    uploadMinios.formFile.CopyTo(fileStream);
                    var data = new PutObjectArgs()
                        .WithBucket(bucket)
                        .WithObject(objectName)
                        .WithFileName(FilePath)
                        .WithContentType("application/octet-stream");
                    await _Minioct.CreateConnection().PutObjectAsync(data);
                    fileStream.Dispose();
                }



                MinIOservices.FileBucketMinio fileBucketMinios = new MinIOservices.FileBucketMinio
                {
                    FileName = uploadMinios.FileName,
                    FilePath = _Minioct.HTTPS ? "https://" : "http://" + string.Format("{0}:{1}/{2}/{3}", _Minioct.Endpoin, _Minioct.PORT, bucket, objectName),
                    Size = uploadMinios.Size,
                };
                File.Delete(FilePath);


                return (new HttpObject.APIMapper<MinIOservices.FileBucketMinio> { code = HttpObject.Enums.Httpstatuscode_API.OK, Data = fileBucketMinios, Messenger = "Succes" });
            }
            catch (MinioException ex)
            {
                Logger.Instance.Messenger(ex.Message).build(Logger._TypeFile.Error);
                return (new HttpObject.APIMapper<MinIOservices.FileBucketMinio> { code = HttpObject.Enums.Httpstatuscode_API.ERROR, Data = null, Messenger = ex.Message });
            }
        }
    }
}
