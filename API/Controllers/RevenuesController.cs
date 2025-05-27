using Application.Core;
using Application.Revenue;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class RevenuesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> Index([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("{id}")]
        public ActionResult Details(Guid id)
        {
            var respone = new RevenueDto
            {
                Id = id,
                SaleDate = DateTime.Now,
                AddedByUserName = "Deep details",
                AddedDate = DateTime.Now.AddDays(-1),
                CultivatedWeight = 810,
                DonateWeight = 20,
                Remark = "i dont know",
                SalePrice = 5,
                SampleWeight = 40,
                SoldWeight = 780,
                Wastage = 0,
            };
            return Ok(respone);
        }
        
        [HttpPost]
        public async Task<IActionResult> Create(Revenue revenue)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Revenue = revenue }));
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return Ok();
        }
    }
}
