using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.lib.Sql;
using System.api.Command;
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
        [Authorize]
        [HttpGet("Region/All")]
        public async Task<IActionResult> GetRegionAllAsync(int Status = 6, string Text = "")
        {
            return Ok(await _Iregion.GetAllRegion(Status, Text));
        }
        [Authorize]
        [HttpPatch("Region")]
        public async Task<IActionResult> PatchRegionXaAsync(string Region, int ID, string Value)
        {
            if (Region == "XA") { return Ok(await _Iregion.UpdateXa(ID, Value)); }
            if (Region == "HUYEN") { return Ok(await _Iregion.UpdateHuyen(ID, Value)); }
            if (Region == "TINH") { return Ok(await _Iregion.UpdateTinh(ID, Value)); }
            return BadRequest(new HttpObject.APIresult { code = Services.lib.Http.HttpObjectData.Enums.Httpstatuscode_API.WARN, Data = null, Messenger = "Region is not contains XA , HUYEN, TINH" });
        }

    }
}
