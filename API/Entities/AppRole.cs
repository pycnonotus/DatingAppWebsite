using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppRole: IdentityRole<Guid>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }

    }
}