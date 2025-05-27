using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SaleRegisters;

public class Create
{
    public class Command : IRequest<Result<SaleRegisterDto>>
    {
        public SaleRegisterAddDto SaleRegister { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.SaleRegister).SetValidator(new SaleRegisterValidator());
        }
    }

    public class Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Command, Result<SaleRegisterDto>>
    {
        public async Task<Result<SaleRegisterDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName(), cancellationToken);
            if (user == null) return null;

            var customer = await context.DairyFarms.FirstOrDefaultAsync(x => x.Id == request.SaleRegister.DairyFarmId);
            if (customer == null) return null;

            SaleRegister saleRegister = mapper.Map<SaleRegister>(request.SaleRegister);
            saleRegister.AddedBy = user;
            saleRegister.DairyFarm = customer;

            context.SaleRegister.Add(saleRegister);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;


            if (result) return Result<SaleRegisterDto>.Success(mapper.Map<SaleRegisterDto>(saleRegister));

            return Result<SaleRegisterDto>.Failure("Failed to create Sale Register");
        }
    }
}
