﻿using BloodBank.api.interfaces;
using BloodBank.api.Model;
using Microsoft.AspNetCore.Mvc;
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

        /// <summary>
        /// Đăng nhập
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost("Authorization")]
        public async Task<IActionResult> Index([FromBody] Login login)
        {
            var data = await _login.AuthorizationAsync(login);
            return data.code == Services.lib.Sql.HttpObject.Enums.Httpstatuscode_API.OK ? Ok(data) : BadRequest(data);
        }
    }
}
