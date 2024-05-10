using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms;

public class Create
{
    public class Command : IRequest<Result<Unit>>
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


    public class Handler(DataContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName(), cancellationToken);
            if(user == null) return null;

            request.DairyFarm.AddedBy = user;

            context.DairyFarms.Add(request.DairyFarm);

            var result = await context.SaveChangesAsync() > 0;

            if(result) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Failed to create Dairy Farm");
        }
    }
}