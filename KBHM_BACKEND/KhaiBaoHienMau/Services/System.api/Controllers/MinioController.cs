using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using RestSharp;
using System.api.Interfaces;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.WebSockets;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

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
        [HttpGet("{bucket}/{filename}")]
        public async Task<IActionResult> PostDownLoadFileasync(string bucket, string filename)
        {
            try
            {
                WebClient webClient = new WebClient();
                string Domain = string.Format("{0}:9000/{1}/{2}", "http://192.168.18.8", bucket, filename);
                Console.WriteLine(Domain);
                var ByteDownload = webClient.DownloadData(Domain);
                Stream stream = new MemoryStream(ByteDownload);
                return new FileStreamResult(stream, "image/jpeg");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
         
         
        }
    }
}
