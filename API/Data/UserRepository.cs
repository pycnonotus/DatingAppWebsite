using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DTO;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        public async Task<IEnumerable<MemberDto>> GetMembers()
        {
            return await this.context.Users.AsQueryable().ProjectTo<MemberDto>(this.mapper.ConfigurationProvider).AsNoTracking().ToListAsync();

        }
    }
}
