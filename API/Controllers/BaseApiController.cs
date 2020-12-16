using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    ///  the basic api controller,
    ///  //TODO: doc this 
    /// </summary>
    [ApiController]
    [Route ("/api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
    }
}
