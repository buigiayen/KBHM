using BloodBank.api.interfaces;
using BloodBank.api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.lib.authorization;
using System;
using System.Threading.Tasks;

namespace BloodBank.api.Controllers
{
    [Route("v1/")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly ILogin _login;
        public AuthorizationController(ILogin login)
        {
            _login = login;
        }
        [HttpGet("Authorization")]
        public async Task<IActionResult> Index([FromForm] Login login)
        {
            
            var data = await _login.AuthorizationAsync(login);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
    }
}
