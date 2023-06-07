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
        
        [HttpPost("File")]
        public async Task<IActionResult> PostFileasync([FromQuery] MinIOservices.FileBucketMinio uploadMinios, [FromQuery] string Bucket)
        {
            var data = await _minio.PostFileasync(uploadMinios, Bucket);        
            return Ok(data);
        }
        [HttpPost("File/Minio")]
        public async Task<IActionResult> PostDownLoadFileasync([FromQuery] MinIOservices.FileBucketMinio uploadMinios)
        {
            // var data = await _minio.DownLoadFileBucketAsync(uploadMinios);
             return Ok("null");
        }
    }
}
