using API.DTO;
using API.Entities;
using AutoMapper;
using DTO;

namespace API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<AppUser, MemberDto>();



        }
    }
}
