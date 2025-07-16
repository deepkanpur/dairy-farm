using Application.Core;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SaleRegisters;

public class Update
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

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Result<SaleRegisterDto>>
    {
        public async Task<Result<SaleRegisterDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var saleRegister = await context.SaleRegister.FirstOrDefaultAsync(x => x.Id.Equals(request.SaleRegister.Id), cancellationToken);
            if (saleRegister == null) return null;

            //saleRegister = mapper.Map<SaleRegister>(request.SaleRegister);
            saleRegister.SoldWeight = request.SaleRegister.SoldWeight;
            saleRegister.SalePrice = request.SaleRegister.SalePrice;
            saleRegister.Remark = request.SaleRegister.Remark;

            context.SaleRegister.Update(saleRegister);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;


            if (result) return Result<SaleRegisterDto>.Success(mapper.Map<SaleRegisterDto>(saleRegister));

            return Result<SaleRegisterDto>.Failure("Failed to update Sale Register");
        }
    }
}
