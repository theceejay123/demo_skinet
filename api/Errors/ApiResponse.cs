namespace api.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessage(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "You have made a bad request",
                401 => "You are not authorized",
                404 => "The resource you are trying to find is not found",
                500 => "Internal server error",
                _ => null
            };
        }
    }
}
