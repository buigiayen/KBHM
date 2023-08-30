using BloodBank.api.Model;
using FluentValidation;

namespace BloodBank.api.Validator
{
    public class LoginValidator : AbstractValidator<Login>
    {
        public LoginValidator()
        {
            RuleFor(x => x.UserID).NotNull().WithMessage("Username null!");
            RuleFor(x => x.PasswordWeb).NotNull().WithMessage("Password null!");
        }
    }
}
