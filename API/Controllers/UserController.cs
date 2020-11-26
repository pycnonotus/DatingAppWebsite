using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        // GET
        [HttpPost("register")]
        public IActionResult Register()
        {
            return Ok();
        }
    }
}