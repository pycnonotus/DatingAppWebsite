using System.Threading.Tasks;
using API.Data;
using AutoMapper;
using Extensions;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {

        private readonly IMapper mapper;
        // private readonly PresenceTracker presenceTracker;
        private readonly UnitOfWork unitOfWork;
        public MessageHub(UnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        public override async Task OnConnectedAsync()
        {
            string username = Context.User.GetUsername();
            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext.Request.Query["user"].ToString();
            var groupName = GetGroupName(username, otherUser);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var group = await AddToGroup(groupName);
            await Clients.Group(groupName).SendAsync("UpdateGroup", group);

            var messages = await unitOfWork.MessageRepository.GetMessageThread(username, otherUser);

            if (unitOfWork.HasChanges())
            {
                await unitOfWork.Complete();
            }

            await Clients.Caller.SendAsync("ReceiveMessageThread", messages);


        }

        private string GetGroupName(string username, string otherUser)
        {
            var stringComper = string.CompareOrdinal(username, otherUser) < 0;
            return stringComper ? $"{username}-{otherUser}" : $"{username}-{otherUser}";
        }
    }
}
