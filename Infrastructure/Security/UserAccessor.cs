using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor(IHttpContextAccessor httpContextAccessor) : IUserAccessor
    {
        public string GetUserName()
        {
            return httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}