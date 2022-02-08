using System.Security.Claims;
using api.DTOs;
using api.Errors;
using api.Extensions;
using AutoMapper;
using core.Entities.Identity;
using core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace api.Controllers;

public class AccountController : BaseController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<AppUserDTO>> GetCurrentUser()
    {
        var user = await _userManager.FindByClaimsPrincipalAsync(User);
        
        return new AppUserDTO {Email = user.Email, DisplayName = user.DisplayName, Token = _tokenService.CreateToken(user)};
    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExistAsync([FromQuery] string email)
    {
        return await _userManager.FindByEmailAsync(email) != null;
    }

    [HttpGet("address")]
    [Authorize]
    public async Task<ActionResult<AppUserAddressDTO>> GetUserAddress()
    {
        var user = await _userManager.FindByClaimsPrincipalWithAddressAsync(User);
        return _mapper.Map<Address, AppUserAddressDTO>(user.Address);
    }

    [HttpPut("address")]
    [Authorize]
    public async Task<ActionResult<AppUserAddressDTO>> UpdateUserAddress(AppUserAddressDTO address)
    {
        var user = await _userManager.FindByClaimsPrincipalWithAddressAsync(User);
        user.Address = _mapper.Map<AppUserAddressDTO, Address>(address);
        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            return BadRequest("Problem updating the user");
        }
        
        return Ok(_mapper.Map<Address, AppUserAddressDTO>(user.Address));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUserDTO>> Login(AppUserLoginDTO appUserLoginDto)
    {
        var user = await _userManager.FindByEmailAsync(appUserLoginDto.Email);

        if (user == null)
        {
            return Unauthorized(new ApiResponse(401));
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, appUserLoginDto.Password, false);

        if (!result.Succeeded)
        {
            return Unauthorized(new ApiResponse(401));
        }

        return new AppUserDTO {Email = user.Email, DisplayName = user.DisplayName, Token = _tokenService.CreateToken(user)};
    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUserDTO>> Register(AppUserRegisterDTO appUserRegisterDto)
    {
        if (CheckEmailExistAsync(appUserRegisterDto.Email).Result.Value)
        {
            return new BadRequestObjectResult(new ApiValidation{Errors = new []{"Email address is in use"}});
        }
        
        AppUser user = new AppUser
        {
            DisplayName = appUserRegisterDto.DisplayName,
            Email = appUserRegisterDto.Email,
            UserName = appUserRegisterDto.Email
        };

        var result = await _userManager.CreateAsync(user, appUserRegisterDto.Password);

        if (!result.Succeeded)
        {
            return BadRequest(new ApiResponse(400));
        }

        return new AppUserDTO() {DisplayName = user.DisplayName, Email = user.Email, Token = _tokenService.CreateToken(user)};
    }
}
