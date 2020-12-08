using API.DTO;
using API.Entities;
using AutoMapper;
using DTO;
using Extensions;

namespace API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<AppUser, MemberDto>().ForMember(
                dest => dest.Age,
                opt => opt.MapFrom(sr => sr.DateOfBirth.GetAge())
            );



        }
    }
}
