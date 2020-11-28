using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var isUserExists = await _userManager.Users.Where(x => x.NormalizedUserName == registerDto.Username)
                .Select(x => 1)
                .FirstOrDefaultAsync(); // defualot of int is 0 , not null 
            if (isUserExists != 0)
            {
                return BadRequest("This user already exists");
            }

            var user = _mapper.Map<AppUser>(registerDto);

            await _userManager.CreateAsync(user, registerDto.Password);


            return Ok();
        }

        [HttpPost("/login")]
        public async Task<ActionResult<LoginBackDto>> Login(LoginDto loginDto)
        {
            var login = await _userManager.FindByNameAsync(loginDto.Username);
            if (login == null)
            {
                return Unauthorized("Wrong Username of Password"); // we don't want to indicate the user if the password or username are wrong bc' security 
            }

            var loginAtempt =
                (await _signInManager.CheckPasswordSignInAsync(login, loginDto.Password,
                    false)).Succeeded; // todo: added lock after few atempts?
            if (!loginAtempt)
            {
                return Unauthorized("Wrong Username of Password");

            }

            return new LoginBackDto
            {
                Token =  await _tokenService.CreateToken(login)
            };
        }
    }
}