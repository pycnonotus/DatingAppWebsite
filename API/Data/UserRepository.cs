using System;
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
        [Obsolete("use the ''full'' methon insteed , this method is deprecated and should used only for testing purposes")]

        public async Task<IEnumerable<MemberDto>> GetMembers()
        {
            return await this.context.Users.AsQueryable().ProjectTo<MemberDto>(this.mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<MemberDto>> GetMembers(string genderUserLookingFor, int minAge, int maxAge, string username, string userGender)
        {
            username = username.ToUpper();
            var query = this.context.Users.AsQueryable();
            query = query.Where(x => x.NormalizedUserName != username.ToUpper());
            if (genderUserLookingFor != "both")
            {
                query = query.Where(x => x.Gender.ToLower() == genderUserLookingFor.ToLower());
            }
            query = query.Where(x => x.LookingFor.ToLower() == "both" || x.LookingFor.ToLower() == userGender);
            //calc minAge and maxAge dates TODO: maybe make it more organized?
            DateTime today = DateTime.Today;
            DateTime minAgeDate = today.AddYears(-minAge);
            DateTime maxAgeDate = today.AddYears(-(maxAge + 1)).AddDays(-1);

            query = query.Where(x => x.DateOfBirth <= minAgeDate
            &&
            x.DateOfBirth >= maxAgeDate
            );

            query = query.Where(
                x => !context.Likes.Any(
                    l => l.SourceUser.NormalizedUserName == username
                    && l.LikedUserId == x.Id
                )
            );

            return await query.ProjectTo<MemberDto>(this.mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
        }


        public async Task<IEnumerable<MemberDto>> GetMemberMatches(string username)
        {
            username = username.ToUpper();
            var query = context.Likes.Where(q => q.SourceUser.NormalizedUserName == username && q.Liked).
            Where(q => context.Likes.Any(f => f.SourceUserId == q.LikedUserId && q.Liked)).
            Select(x => x.LikedUser)
            .OrderBy(x => x.Created).Reverse();
            return await query.ProjectTo<MemberDto>(this.mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
        }
    }
}
