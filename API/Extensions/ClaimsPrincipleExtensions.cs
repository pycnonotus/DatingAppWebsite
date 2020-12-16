using System.Security.Claims;

namespace Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;

        }

        public static string GetPreferredGender(this ClaimsPrincipal user)
        {
            return user.FindFirst("preferred_gender")?.Value?.ToLower();
        }
        public static string GetGender(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Gender)?.Value?.ToLower();
        }
        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(
            user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
