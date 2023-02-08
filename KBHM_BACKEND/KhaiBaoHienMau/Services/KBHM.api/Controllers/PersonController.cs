using KBHM.api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ?  CreatedAtAction("Person", data) : BadRequest();
        }

    }
}
