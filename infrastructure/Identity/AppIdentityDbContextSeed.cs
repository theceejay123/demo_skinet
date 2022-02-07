using core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace infrastructure.Identity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
    {
        if (userManager.Users.Any())
        {
            return;
        }

        AppUser user = new()
        {
            DisplayName = "Bob",
            Email = "bob@test.com",
            UserName = "bot@test.com",
            Address = new()
            {
                FirstName = "Bob",
                LastName = "Bobbity",
                Street = "123 Playground Street",
                City = "New York",
                State = "NY",
                PostalCode = "91210"
            }
        };

        await userManager.CreateAsync(user, "Pa$$w0rd");
    }
}
