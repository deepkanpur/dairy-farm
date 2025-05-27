using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms;

public class Create
{
    public class Command : IRequest<Result<DairyFarmDto>>
    {
        public DairyFarm DairyFarm { get; set; }
    }

    public class CommandValidator: AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x=> x.DairyFarm).SetValidator(new DairyFarmValidator());
        }
    }

    public class Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Command, Result<DairyFarmDto>>
    {
        public async Task<Result<DairyFarmDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName(), cancellationToken);
            if(user == null) return null;

            request.DairyFarm.AddedBy = user;

            context.DairyFarms.Add(request.DairyFarm);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;


            if(result) return Result<DairyFarmDto>.Success(mapper.Map<DairyFarmDto>(request.DairyFarm));

            return Result<DairyFarmDto>.Failure("Failed to create Dairy Farm");
        }
    }
}