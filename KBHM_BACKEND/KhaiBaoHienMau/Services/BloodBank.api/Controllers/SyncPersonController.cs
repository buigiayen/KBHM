using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BloodBank.api.Controllers
{
    [Authorize]
    [Route("v1/")]
    [ApiController]
    public class SyncPersonController : ControllerBase
    {
        [HttpGet("TokenVeryfy")]
        public async Task<IActionResult> CheckToken()
        {
            return Ok("Hello");
        } 
    }
}
