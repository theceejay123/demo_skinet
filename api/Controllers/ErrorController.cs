using api.Errors;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("errors/{statusCode}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseController
    {
        public IActionResult Error(int statusCode)
        {
            return new ObjectResult(new ApiResponse(statusCode));
        }
    }
}
