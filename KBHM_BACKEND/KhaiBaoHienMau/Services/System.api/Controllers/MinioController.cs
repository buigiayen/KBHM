using Domain;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetBucketasync([FromQuery]MinIOservices.MinIOModel uploadMinios)
        {
            var data = await _minio.GetFileBucketasync(uploadMinios);
            return Ok(data);

        }
        [HttpGet("StreamFile")]
        public async Task<IActionResult> GetStreamFileasync(string Url)
        {
            try
            {
                RestClient client = new RestClient();
                RestRequest request = new RestRequest(Url, Method.Get);
                Dictionary<string, string> _dic = new Dictionary<string, string>();
                _dic.Add("contentType", "application/octet-stream");
                request.AddHeaders(_dic);
                var response = await client.DownloadStreamAsync(request);
                return new FileStreamResult(response, "image/jpeg");
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
         

           
        }
        [HttpPost("File")]
        public async Task<IActionResult> PostFileasync([FromQuery] MinIOservices.FileBucketMinio uploadMinios,[FromQuery] string Bucket)
        {
            var data = await _minio.PostFileasync(uploadMinios, Bucket);
            return Ok(data);
        }
      
    }
}
