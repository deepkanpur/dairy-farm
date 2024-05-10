using Domain;
using FluentValidation;

namespace Application.DairyFarms;

public class DairyFarmValidator: AbstractValidator<DairyFarm>
{
    public DairyFarmValidator()
    {
        RuleFor(x => x.BusinessName).NotEmpty();
        RuleFor(x => x.ContactName).NotEmpty();
        RuleFor(x => x.ContactNumber).NotEmpty();            
        RuleFor(x => x.Address).NotEmpty();            
        RuleFor(x => x.Area).NotEmpty();            
        RuleFor(x => x.City).NotEmpty();            
        RuleFor(x => x.Pincode).NotEmpty();            
        RuleFor(x => x.BuffaloCount).NotEmpty();
        RuleFor(x => x.CowCount).NotEmpty();
        RuleFor(x => x.WorkerCount).NotEmpty();
        RuleFor(x => x.Latitude).NotEmpty();
        RuleFor(x => x.Longitude).NotEmpty();
    }
}