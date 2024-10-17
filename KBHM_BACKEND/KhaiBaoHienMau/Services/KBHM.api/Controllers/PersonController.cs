using KBHM.api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace KBHM.api.Controllers
{
    [Route("v1/")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        public Interfaces.Person _Person { get; set; }
        public PersonController(Interfaces.Person Person) { _Person = Person; }
        [HttpPost("Person")]
        public async Task<IActionResult> PostPerson([FromBody] Person person)
        {
            var data = await _Person.PostPerson(person);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Created("Person", data) : BadRequest(data);
        }
        [Authorize]
        [HttpPut("Person")]
        public async Task<IActionResult> PutPerson([FromBody] Person person)
        {
            var data = await _Person.PutPerson(person);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [Authorize]
        [HttpGet("Person")]
        public async Task<IActionResult> GetAllPerson([FromQuery] Person person)
        {
            var data = await _Person.GetPerson(person);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [HttpGet("Person/{ID}")]
        public async Task<IActionResult> GetPerson(string ID)
        {
            var data = await _Person.GetRowIDPerson(new Person { RowID = new Guid(ID) });
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [HttpGet("Person/{Text}/Find/{ROW}")]
        public async Task<IActionResult> GetFindPerson(string Text, int ROW = 10)
        {
            var data = await _Person.GetFindPerson(new Person { Text = Text, Row = ROW });
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [HttpGet("Person/{ID}/Properties")]
        public async Task<IActionResult> GetPropertiesPerson(Guid ID)
        {
            var data = await _Person.GetRowIDPropertiesPerson(new Person { RowID = ID });
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [Authorize]
        [HttpPut("Person/healthy")]
        public async Task<IActionResult> PutPersonHealthy([FromBody] Person person)
        {
            var data = await _Person.PutPersonHealthy(person);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);

        }
        [Authorize]
        [HttpPut("Person/Trip")]
        public async Task<IActionResult> PutPersonTrip([FromBody] Person person)
        {
            var data = await _Person.PutPersonTip(person);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }

        [Authorize]
        [HttpPut("Person/Done")]
        public async Task<IActionResult> PutPersonDone([FromBody] Person person)
        {
            var data = await _Person.PutPersonDone(person);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);

        }
        [Authorize]
        [HttpPut("Person/ABORH")]
        public async Task<IActionResult> PutPersonABORH([FromBody] Person person)
        {
            var data = await _Person.PutPersonABORH(person);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [Authorize]
        [HttpPost("Person/Delay")]
        public async Task<IActionResult> PostPersonDonateDelay([FromBody] PersonDonateDelay person)
        {
            var data = await _Person.PostPersonDonateDelay(person);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [Authorize]
        [HttpGet("Person/Delay/{CCCD}")]
        public async Task<IActionResult> GetPersonDonateDelay(string CCCD)
        {
            var data = await _Person.GetPersonDonateDelay(new PersonDonateDelay { CCCD = CCCD });
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [Authorize]
        [HttpPut("Person/Delay")]
        public async Task<IActionResult> PutPersonDonateDelay([FromBody] PersonDonateDelay person)
        {
            var data = await _Person.PutPersonDonateDelay(person);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [Authorize]
        [HttpPut("Person/Delay/{ID}")]
        public async Task<IActionResult> DeletePersonDonateDelay(string ID, [FromBody] PersonDonateDelay person)
        {
            var data = await _Person.DeletePersonDonateDelay(new PersonDonateDelay { RowID = new Guid(ID),CancelReason = person.CancelReason });
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [Authorize]
        [HttpGet("Person/Lastdonor/{CCCD}")]
        public async Task<IActionResult> CheckLastDonor(string CCCD)
        {
            var data = await _Person.CheckLastDonor(new Person { CCCD = CCCD });
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
    }
}

