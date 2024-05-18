using Application.DairyFarms.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub(IMediator mediator) : Hub
    {
        public async Task SendComment(Create.Command command)
        {
            var comment = await mediator.Send(command);
            await Clients.Group(command.DairyFarmId.ToString()).SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var dairyFarmId = httpContext.Request.Query["dairyFarmId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, dairyFarmId);
            var result = await mediator.Send(new List.Query { DairyFarmId = Guid.Parse(dairyFarmId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}