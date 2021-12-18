using System.Net;

namespace api.Errors
{
    public class ApiValidation : ApiResponse
    {
        public ApiValidation() : base((int)HttpStatusCode.BadRequest)
        {
        }

        public IEnumerable<string> Errors { get; set; }
    }
}
