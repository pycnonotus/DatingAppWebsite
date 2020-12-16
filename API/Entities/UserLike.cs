using System;
using API.Entities;

namespace Entities
{
    public class UserLike
    {
        public AppUser SourceUser { get; set; }
        public Guid SourceUserId { get; set; }
        public AppUser LikedUser { get; set; }
        public Guid LikedUserId { get; set; }

        public bool Liked { get; set; }




    }
}
