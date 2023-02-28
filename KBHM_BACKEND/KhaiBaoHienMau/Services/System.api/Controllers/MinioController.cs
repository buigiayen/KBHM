using Domain;
using Microsoft.AspNetCore.Mvc;
using System.api.Interfaces;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace System.api.Controllers
{
    [Route("v1/")]
    [ApiController]
    public class MinioController : ControllerBase
    {
        public readonly IMinio _minio;
        public MinioController(IMinio minio)
        {
            _minio = minio;
        }
        [HttpGet("File")]
        public async Task<IActionResult> GetBucketasync([FromQuery]MinIOservices.MinIOModel uploadMinios)
        {
            var data = await _minio.GetFileBucketasync(uploadMinios);
            return Ok(data);

        }
        
        [HttpPost("File")]
        public async Task<IActionResult> PostFileasync([FromQuery] MinIOservices.FileBucketMinio uploadMinios,[FromQuery] string Bucket)
        {
            var data = await _minio.PostFileasync(uploadMinios, Bucket);
            return Ok(data);

        }
      
    }
}
