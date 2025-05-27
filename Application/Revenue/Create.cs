using Application.Core;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Revenue;

public class Create
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

    public class Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Command, Result<RevenueDto>>
    {
        public async Task<Result<RevenueDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName(), cancellationToken);
            if (user == null) return null;

            request.Revenue.AddedBy = user;

            context.Revenues.Add(request.Revenue);

            var result = await context.SaveChangesAsync() > 0;


            if (result) return Result<RevenueDto>.Success(mapper.Map<RevenueDto>(request.Revenue));

            return Result<RevenueDto>.Failure("Failed to create Revenue");
        }
    }
}
