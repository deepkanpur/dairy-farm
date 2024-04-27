using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must have 1 letter, 1 number and at least 4 characters")]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}