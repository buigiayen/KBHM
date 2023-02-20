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
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _Category;
        public CategoryController(ICategory Category)
        {
            _Category = Category;
        }
        [HttpGet("Location")]
        public async Task<IActionResult> GetLocationasync()
        {
            var data = await _Category.GetLocation();
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [HttpGet("Ml")]
        public async Task<IActionResult> GetmlBloodasync()
        {
            var data = await _Category.GetMlBoold();
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
        [HttpGet("Element")]
        public async Task<IActionResult> GetElementBloodasync()
        {
            var data = await _Category.GetElementBoold();
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
    }
}
