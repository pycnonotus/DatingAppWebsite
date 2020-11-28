using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 6)]
        public string Password { get; set; }

        [Required] public DateTime DateOfBirth { get; set; }
        [Required] public string Gender { get; set; }
        [Required] public string City { get; set; }
    }
}