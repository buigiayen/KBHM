using Microsoft.AspNetCore.Mvc;
using System.api.Interfaces;
using System.Threading.Tasks;

namespace System.api.Controllers
{
    [Route("v1/")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        private IRegion _Iregion;
        public RegionController(IRegion region)
        {
            _Iregion = region;
        }

        [HttpGet("Region")]
        public async Task<IActionResult> GetRegionAsync(int Status = 6, string Text = "")
        {
            return Ok(await _Iregion.GetRegion(Status, Text));
        }
    }
}
