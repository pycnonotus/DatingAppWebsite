using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UnitOfWork
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        public UserRepository UserRepository => new UserRepository(context, mapper);
        public LikeRepository LikeRepository => new LikeRepository(context, mapper);
        public MessageRepository MessageRepository => new MessageRepository(context, mapper);

        public async Task<bool> Complete()
        {
            return await this.context.SaveChangesAsync() > 0;
        }
       
        public bool HasChanges()
        {
            return context.ChangeTracker.HasChanges();
        }


    }
}
