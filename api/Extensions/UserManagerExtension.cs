using System.Security.Claims;
using core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class UserManagerExtension
{
    public static async Task<AppUser> FindByClaimsPrincipalWithAddressAsync(this UserManager<AppUser> input, ClaimsPrincipal user)
    {
        var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
    }

    public static async Task<AppUser> FindByClaimsPrincipalAsync(this UserManager<AppUser> input,
        ClaimsPrincipal user)
    {
        var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
    }
}
