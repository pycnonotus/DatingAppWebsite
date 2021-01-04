using API.DTO;
using API.Entities;
using AutoMapper;
using DTO;
using Entities;
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
            CreateMap<Message, MessageDto>();
            CreateMap<MessageDto, Message>();



        }
    }
}
