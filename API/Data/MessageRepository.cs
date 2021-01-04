using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DTO;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class MessageRepository
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public MessageRepository(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string username, string otherUser)
        {
            username = username.ToUpper();
            otherUser = otherUser.ToUpper();
            var messages = this.context.Messages.Where(x => x.Sender.NormalizedUserName == username || x.Sender.NormalizedUserName == otherUser)
            .Where(x => x.Recipient.NormalizedUserName == otherUser || x.Recipient.NormalizedUserName == username).OrderBy(x => x.MessageSent);

            return await messages.ProjectTo<MessageDto>(this.mapper.ConfigurationProvider).ToListAsync();
        }
        public async Task<IEnumerable<MessageDto>> GetMessageGroup(String groupName)
        {
            groupName = groupName.ToUpper();
            var users = groupName.Split('@');
            var que = this.context.Messages.Where(c =>
                c.Recipient.UserName == users[0] ||
                c.Recipient.UserName == users[1]
            ).Where(c => c.SenderUsername == users[0] ||
                        c.SenderUsername == users[1])
            .OrderBy(x => x.MessageSent);
            return await que.ProjectTo<MessageDto>(this.mapper.ConfigurationProvider).ToListAsync();
        }
        public void AddMessage(Message message)
        {
            this.context.Messages.Add(message);
        }
    }
}
