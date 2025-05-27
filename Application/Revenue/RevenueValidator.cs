using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Revenue;

public class RevenueValidator : AbstractValidator<Domain.Revenue>
{
    public RevenueValidator() 
    { 
        RuleFor(x => x.SaleDate).LessThanOrEqualTo(DateTime.Now.AddDays(1));
    }
}
