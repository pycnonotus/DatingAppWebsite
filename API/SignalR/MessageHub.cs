using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using API.Data;
using AutoMapper;
using Extensions;
using Microsoft.AspNetCore.SignalR;


using System;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using AutoMapper;
using DTO;
using Entities;

namespace API.SignalR
{
    public class MessageHub : Hub
    {

        private readonly IMapper mapper;
        // private readonly PresenceTracker presenceTracker;
        private readonly UnitOfWork unitOfWork;
        private static readonly Dictionary<string, Dictionary<string, ConfectionInfo>> activeGroups = new();
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
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string username = Context.User.GetUsername();
            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext.Request.Query["user"].ToString();
            var groupName = GetGroupName(username, otherUser);
            // var group = await RemoveFromMessageGroup();
            // await Clients.Group(groupName).SendAsync("UpdateGroup", group);

            await base.OnDisconnectedAsync(exception);
        }
        private async Task<Dictionary<string, ConfectionInfo>> AddToGroup(string groupName)
        {
            var connection = new ConfectionInfo()
            {
                Username = Context.User.GetUsername().ToUpper(),
                GroupName = groupName,
                ConnectionId = this.Context.ConnectionId
            };
            if (!activeGroups.Keys.Any(x => x.ToUpper() == groupName.ToUpper()))
            {
                activeGroups.Add(groupName, new Dictionary<string, ConfectionInfo>());
            }
            activeGroups[groupName].Add(connection.ConnectionId, connection);
            var group = activeGroups[groupName];
            return group;
        }
        private string GetGroupName(string username, string otherUser)
        {
            var stringComper = string.CompareOrdinal(username, otherUser) < 0;
            return stringComper ? $"{username}@{otherUser}" : $"{otherUser}@{username}";
        }
        private async Task<Group> RemoveFromMessageGroup()
        {
            throw new Exception("not impl");
        }


        public async Task SendMessage(CreateMessageDto createMessage)
        {
            var username = Context.User.GetUsername();

            if (username == createMessage.RecipientUsername.ToLower()) throw new HubException("you cant talk with ur self");
            string str = createMessage.Content;
            if (String.IsNullOrWhiteSpace(str))
            {
                throw new HubException("blank massage");
            }

            var sender = await unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var recipient = await unitOfWork.UserRepository.GetUserByUsernameAsync(createMessage.RecipientUsername);
            if (recipient == null) throw new HubException("recipient not found");
            var massage = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = username,
                RecipientUsername = recipient.UserName,
                Content = createMessage.Content,
            };
            var groupName = GetGroupName(sender.UserName, recipient.UserName);
            var group = await unitOfWork.MessageRepository.GetMessageGroup(groupName);
            if (1 == 1)
            {
                massage.DateRead = DateTime.UtcNow;
            }
            else
            {
                // var connections = await this.presenceTracker.GetConnectionsForUser(recipient.UserName);
                // if (connections != null)
                // {
                //     await this.presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived", new
                //     {
                //         username = sender.UserName,
                //         known_as = sender.KnownAs
                //     }
                //     );
                // }
            }
            unitOfWork.MessageRepository.AddMessage(massage);
            if (await unitOfWork.Complete())
            {
                await Clients.Group(groupName).SendAsync("NewMessage", this.mapper.Map<MessageDto>(massage));
            }
        }
    }
    class ConfectionInfo
    {
        public string Username { get; set; }
        public string GroupName { get; set; }
        public string ConnectionId { get; set; }
    }
}
