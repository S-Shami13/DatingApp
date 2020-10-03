using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTO
{
    public class UserForRegisterDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 to 8 characters")]
        public string Password { get; set; }
    }
}