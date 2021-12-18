namespace api.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode, string message = null, string stackTrace = null) : base(statusCode, message)
        {
            StackTrace = stackTrace;
        }

        public string StackTrace { get; set; }
    }
}
