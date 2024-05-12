using Application.DairyFarms;
using Application.DairyFarms.Photos;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FarmsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDairyFarms()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDairyFarm(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDairyForm(DairyFarm dairyFarm)
        {
            return HandleResult(await Mediator.Send(new Create.Command { DairyFarm = dairyFarm }));            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDairyForm(Guid id, DairyFarm dairyFarm)
        {
            dairyFarm.Id = id;
            return Ok();
        }


        [HttpPost("{id}/photos")]
        public async Task<IActionResult> AddDairyFarmPhoto(Guid id, [FromForm] AddPhotoRequest addPhoto)
        {
            return HandleResult(await Mediator.Send(new Add.Command { FarmId = id, DairyFarmPhoto = addPhoto }));
        }

        [HttpPut("{id}/photos/{photoId}/setMain")]
        public async Task<IActionResult> SetMain(Guid id, string photoId)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command {FarmId = id, Id = photoId }));
        }

        [HttpDelete("{id}/photos/{photoId}")]
        public async Task<IActionResult> DeleteDairyFarmPhoto(Guid id, string photoId)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { FarmId = id, Id = photoId }));
        }
    }
}