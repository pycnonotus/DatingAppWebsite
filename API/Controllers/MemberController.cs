using System;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Entities;
using API.Interface;
using AutoMapper;
using DTO;
using Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Npgsql.TypeHandlers;

namespace Controllers
{
    [Authorize]
    public class MemberController : BaseApiController
    {

        private readonly IMapper mapper;
        private readonly UnitOfWork unitOfWork;

        public MemberController(UnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;

        }


        [HttpGet]
        public async Task<IActionResult> GetMembers([FromRoute] SearchDto? searchDto)
        {
            var username = this.User.GetUsername();
            var prefredGender = this.User.GetPreferredGender();
            var userGender = this.User.GetGender();
            var members = await this.unitOfWork.UserRepository.GetMembers(prefredGender, searchDto.MinAge, searchDto.MaxAge, username, userGender);
            return Ok(members);
        }
        [HttpPost]
        public async Task<IActionResult> LikeMember(LikeDto likeDto)
        {
            try
            {
                await unitOfWork.LikeRepository.addUserLike(
                    this.User.GetUsername(),
                    likeDto.Username,
                    likeDto.Like
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return await this.unitOfWork.Complete() ? Ok()
            : throw new Exception(" unknown error has accord, Error code: 8047");
        }

        [HttpGet("match")]
        public async Task<IActionResult> GetMatches()
        {
            var members = await this.unitOfWork.UserRepository.GetMemberMatches(this.User.GetUsername());
            return Ok(members);
        }
    }
}
