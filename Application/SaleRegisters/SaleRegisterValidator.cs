using Domain;
using FluentValidation;

namespace Application.SaleRegisters;

public class SaleRegisterValidator : AbstractValidator<SaleRegisterAddDto>
{
    public SaleRegisterValidator()
    {
        RuleFor(x => x.DairyFarmId).NotEmpty().NotEqual(Guid.NewGuid());
        RuleFor(x => x.SaleDate).NotEqual(DateTime.MinValue);
        RuleFor(x => x.SoldWeight).NotEqual(0);
        RuleFor(x => x.SalePrice).NotEqual(0);
    }
}
