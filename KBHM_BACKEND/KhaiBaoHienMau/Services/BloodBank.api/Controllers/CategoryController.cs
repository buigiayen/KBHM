using BloodBank.api.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.lib.Sql;
using System;
using System.Threading.Tasks;

namespace BloodBank.api.Controllers
{

    [Route("v1/")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _Category;
        public CategoryController(ICategory Category)
        {
            _Category = Category;
        }
        [Authorize]
        [HttpGet("Category")]
        public async Task<IActionResult> GetCateGoryasync()
        {
            HttpObject.APIresult aPI = new HttpObject.APIresult();
            Model.Category Category = new Model.Category();
            try
            {

                Category.Location = await _Category.GetLocation();
                Category.ML = await _Category.GetMlBoold();
                Category.Element = await _Category.GetElementBoold();
                Category.Job = await _Category.GetJob();
                Category.Trip = await _Category.GetTrip();
                Category.BloodSource = await _Category.GetBloodSource();

                aPI.code = HttpObject.Enums.Httpstatuscode_API.OK;
                aPI.Data = Category;
                aPI.Messenger = "Success";
                return Ok(aPI);
            }
            catch (Exception ex)
            {
                aPI.code = HttpObject.Enums.Httpstatuscode_API.ERROR;
                aPI.Messenger = ex.Message;
                aPI.Data = null;
                return BadRequest(aPI);
            }


        }
        [HttpGet("Category/Job")]
        public async Task<IActionResult> GetJobasync()
        {
            HttpObject.APIresult aPI = new HttpObject.APIresult();
            try
            {
                aPI.code = HttpObject.Enums.Httpstatuscode_API.OK;
                aPI.Data = await _Category.GetJob();
                aPI.Messenger = "Success";
                return Ok(aPI);
            }
            catch (Exception ex)
            {
                aPI.code = HttpObject.Enums.Httpstatuscode_API.ERROR;
                aPI.Messenger = ex.Message;
                aPI.Data = null;
                return BadRequest(aPI);
            }
        }

        [HttpGet("Category/Doctor")]
        public async Task<IActionResult> GetDoctorasync()
        {
            HttpObject.APIresult aPI = new HttpObject.APIresult();
            try
            {
                aPI.code = HttpObject.Enums.Httpstatuscode_API.OK;
                aPI.Data = await _Category.GetDoctor();
                aPI.Messenger = "Success";
                return Ok(aPI);
            }
            catch (Exception ex)
            {
                aPI.code = HttpObject.Enums.Httpstatuscode_API.ERROR;
                aPI.Messenger = ex.Message;
                aPI.Data = null;
                return BadRequest(aPI);
            }
        }

        [HttpGet("Category/Trip")]
        public async Task<IActionResult> GetTripasync()
        {
            HttpObject.APIresult aPI = new HttpObject.APIresult();
            try
            {
                aPI.code = HttpObject.Enums.Httpstatuscode_API.OK;
                aPI.Data = await _Category.GetTrip();
                aPI.Messenger = "Success";
                return Ok(aPI);
            }
            catch (Exception ex)
            {
                aPI.code = HttpObject.Enums.Httpstatuscode_API.ERROR;
                aPI.Messenger = ex.Message;
                aPI.Data = null;
                return BadRequest(aPI);
            }
        }

        [HttpGet("Category/BloodSource")]
        public async Task<IActionResult> GetBloodSourceAsync()
        {
            HttpObject.APIresult aPI = new HttpObject.APIresult();
            try
            {
                aPI.code = HttpObject.Enums.Httpstatuscode_API.OK;
                aPI.Data = await _Category.GetBloodSource();
                aPI.Messenger = "Success";
                return Ok(aPI);
            }
            catch (Exception ex)
            {
                aPI.code = HttpObject.Enums.Httpstatuscode_API.ERROR;
                aPI.Messenger = ex.Message;
                aPI.Data = null;
                return BadRequest(aPI);
            }
        }
    }
}
