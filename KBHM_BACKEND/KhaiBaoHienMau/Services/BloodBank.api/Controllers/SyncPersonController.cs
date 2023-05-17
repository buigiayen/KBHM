using BloodBank.api.interfaces;
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
        private ISyncDonnor _ISyncDonnor;
        public SyncPersonController(ISyncDonnor ISyncDonnor)
        {
            _ISyncDonnor = ISyncDonnor;
        }

        [ProducesErrorResponseType(typeof(Services.lib.Sql.HttpObject.API))]
        [ProducesResponseType(typeof(Services.lib.Sql.HttpObject.API), 200)]
        [ProducesDefaultResponseType(typeof(Services.lib.Sql.HttpObject.API))]
        [HttpGet("TokenVeryfy")]
        public async Task<IActionResult> CheckToken()
        {
            return Ok("Hello");
        }

        [HttpPost("SyncDonnor")]
        public async Task<IActionResult> SyncDonnorAsync([FromBody] Model.Donnor.tbl_Donor donnor)
        {
            var data = await _ISyncDonnor.SyncDonnorEx(donnor);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Created("SyncDonnor", data) : BadRequest(data);
        }


        [HttpGet("SyncDonnor/CheckDonnorExCode")]
        public async Task<IActionResult> CheckDonnorEx([FromQuery] string DonorExCode)
        {
            var data = await _ISyncDonnor.CheckDonnorEx(DonorExCode);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }

    }
}
