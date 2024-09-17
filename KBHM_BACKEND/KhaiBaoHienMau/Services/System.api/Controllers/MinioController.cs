using Domain;
using Microsoft.AspNetCore.Mvc;
using Minio.DataModel;
using System.api.Interfaces;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using static Services.lib.Http.HttpObjectData;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            var Minio = new APIMapper<MinIOservices.FileBucketMinio>();
            var ListFile = Request.Form.Files;
            foreach (var item in ListFile)
            {
                Stream steam = item.OpenReadStream();
                Minio = await _minio.PostFileasync(new MinIOservices.FileBucketMinio { formFile = steam, FileName = DateTime.Now.Year + "/" + Guid.NewGuid().ToString("N") +"_"+ item.FileName, Size = item.Length }, Bucket);

            }
            return Ok(Minio);
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
                Console.WriteLine(ex);
                return BadRequest(ex);
            }


        }
    }
}
