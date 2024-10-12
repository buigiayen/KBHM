using BloodBank.api.interfaces;
using BloodBank.api.Model;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("SyncDonnor/Delay")]
        public async Task<IActionResult> SyncDonorDelay([FromBody] Model.BloodDonationDelay delay)
        {
            var data = await _ISyncDonnor.SyncDonorDelay(delay);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Created("SyncDonnor", data) : BadRequest(data);
        }

        [HttpPost("SyncDonnor/Delay/Delete")]
        public async Task<IActionResult> SyncDonorDelayDelete([FromBody] Model.BloodDonationDelay delay)
        {
            var data = await _ISyncDonnor.SyncDeleteDonorDelay(delay);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Created("SyncDonnor", data) : BadRequest(data);
        }


        [HttpGet("SyncDonnor/CheckDonnorExCode")]
        public async Task<IActionResult> CheckDonnorEx([FromQuery] string DonorExCode)
        {
            var data = await _ISyncDonnor.CheckDonnorEx(DonorExCode);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }

        [HttpGet("SyncDonnor/History")]
        public async Task<IActionResult> CheckHistoryDonnor([FromQuery] string IdentityID)
        {
            var data = await _ISyncDonnor.HistoryDonnorAsync(IdentityID);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
    }
}
