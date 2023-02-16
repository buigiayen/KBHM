using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BloodBank.api.Controllers
{
    [Authorize]
    [Route("v1/[controller]")]
    [ApiController]
    public class SyncPersonController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetPt()
        {
            return Ok("Haha");
        } 
    }
}
