using System;
using System.ComponentModel.DataAnnotations;
using Attribute;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 6)]
        public string Password { get; set; }
        [Required]
        [Date]
        public DateTime DateOfBirth { get; set; }
        [Required]
        [Gender]
        public string Gender { get; set; }
        public string City { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [Gender("both")]
        public string LookingFor { get; set; }
        [MaxLength(400)]
        public string AboutMe { get; set; }
    }
}
