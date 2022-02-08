using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class AppUserRegisterDTO
{
    [Required]
    public string DisplayName { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", ErrorMessage = "Password must have an uppercase, lowercase, number, special character and at least 6 characters")]
    public string Password { get; set; }
}
