using System.ComponentModel.DataAnnotations;

namespace BloodBank.api.Model
{
    public class Login
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }

    }
}
