using Application.Core;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Revenue;

public class Update
{
    public class Command : IRequest<Result<RevenueDto>>
    {
        public Domain.Revenue Revenue { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Revenue).SetValidator(new RevenueValidator());
        }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Result<RevenueDto>>
    {
        public async Task<Result<RevenueDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var revenue = await context.Revenues.FirstOrDefaultAsync(x => x.Id.Equals(request.Revenue.Id), cancellationToken);
            if (revenue == null) return null;
;
            revenue.SoldWeight = request.Revenue.SoldWeight;
            revenue.SalePrice = request.Revenue.SalePrice;
            revenue.Remark = request.Revenue.Remark;
            revenue.DonateWeight = request.Revenue.DonateWeight;

            context.Revenues.Update(revenue);

            var result = await context.SaveChangesAsync() > 0;


            if (result) return Result<RevenueDto>.Success(mapper.Map<RevenueDto>(request.Revenue));

            return Result<RevenueDto>.Failure("Failed to create Revenue");
        }
    }
}
