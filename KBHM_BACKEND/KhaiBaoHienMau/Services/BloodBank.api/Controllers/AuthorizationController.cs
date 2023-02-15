using BloodBank.api.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [HttpGet]
        public async Task<IActionResult> Index()
        {

            return Ok();
        }
    }
}
