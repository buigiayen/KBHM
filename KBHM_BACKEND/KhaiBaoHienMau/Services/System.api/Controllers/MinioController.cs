using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using RestSharp;
using System.api.Interfaces;
using System.Collections.Generic;
using System.IO;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace System.api.Controllers
{
    [Route("v1/Files/")]
    [ApiController]
    public class MinioController : ControllerBase
    {
        public readonly IMinio _minio;
        public MinioController(IMinio minio)
        {
            _minio = minio;
        }
        [HttpGet("File")]
        public async Task<IActionResult> GetBucketasync([FromQuery] MinIOservices.MinIOModel uploadMinios)
        {
            var data = await _minio.GetFileBucketasync(uploadMinios);
            return Ok(data);

        }
        [HttpGet("StreamFile/{Bucket}/{FileName}")]
        public async Task<IActionResult> GetStreamFileasync(string Bucket, string FileName, string ContentType = "image/jpge")
        {
            List<MinIOservices.FileBucketMinio> fileBucketMinio = new List<MinIOservices.FileBucketMinio>();
            fileBucketMinio.Add(new MinIOservices.FileBucketMinio { FileName = FileName, FilePath = AppDomain.CurrentDomain.BaseDirectory + $"/{FileName}" });
            try
            {
                var data = await _minio.DownFileasync(new MinIOservices.MinIOModel
                {
                    bucket = Bucket,
                    fileBucketMinios = fileBucketMinio,
                });
                if (data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK)
                {
                    IFileProvider provider = new PhysicalFileProvider(AppDomain.CurrentDomain.BaseDirectory);
                    IFileInfo fileInfo = provider.GetFileInfo(FileName);
                    var readStream = fileInfo.CreateReadStream();
                    return new FileStreamResult(readStream, ContentType);
                }
                else
                {
                    return BadRequest(data);
                }
                        
               
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }



        }
        [HttpPost("File")]
        public async Task<IActionResult> PostFileasync([FromQuery] MinIOservices.FileBucketMinio uploadMinios, [FromQuery] string Bucket)
        {
            var data = await _minio.PostFileasync(uploadMinios, Bucket);
            return Ok(data);
        }

    }
}
