using Application.Core;
using Application.SaleRegisters;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class SalesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> Index([FromQuery] SaleRegisterListParams listParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query {
                DairyFarmId = listParams.DairyFarmId,
                FromDate = listParams.FromDate,
                ToDate = listParams.ToDate,
                Params = new PagingParams { PageNumber = listParams.PageNumber, PageSize = listParams.PageSize }, 
            }));
        }

        [HttpPost]
        public async Task<IActionResult> Create(SaleRegisterAddDto saleRegister)
        {
            return HandleResult(await Mediator.Send(new Create.Command { SaleRegister = saleRegister }));
        }
    }
}
