using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
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
        public async Task<IActionResult> GetMembers()
        {
            var members = await this.unitOfWork.UserRepository.GetMembers();
            return Ok(members);
        }
    }
}
