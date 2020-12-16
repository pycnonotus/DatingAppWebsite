using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using AutoMapper;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class LikeRepository
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public LikeRepository(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        // TODO: maybe to take guid ?
        public async Task addUserLike(string user, string toUser, bool like)
        {
            if (user == toUser) throw new Exception(" you can't like your self");
            Guid userGuid = await context.Users
            .Where(x => x.NormalizedUserName == user.ToUpper())
            .Select(x => x.Id).FirstOrDefaultAsync();

            Guid toUserGuid = await context.Users
            .Where(x => x.NormalizedUserName == toUser.ToUpper())
            .Select(x => x.Id).FirstOrDefaultAsync();

            var oldUSeLike = await context.Likes.Where(x => x.SourceUser.NormalizedUserName == user.ToUpper()
                 && x.LikedUser.NormalizedUserName == toUser.ToUpper()
            ).FirstOrDefaultAsync();
            if (oldUSeLike != null)
            {
                if (like == oldUSeLike.Liked)
                {
                    throw new System.Exception("You already " + (like ? "like" : "dislike") + " this user");
                }
                else
                {
                    oldUSeLike.Liked = like;
                }
            }
            else
            {
                await context.Likes.AddAsync(
                    new UserLike()
                    {
                        Liked = like,
                        LikedUserId = toUserGuid,
                        SourceUserId = userGuid
                    }
                );
            }

        }

    }
}
