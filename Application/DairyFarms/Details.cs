using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms;

public class Details
{
    public class Query : IRequest<Result<DairyFarmDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<DairyFarmDto>>
    {
        public async Task<Result<DairyFarmDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var dairyFarm = await context.DairyFarms.Include(x => x.Photos)
                .ProjectTo<DairyFarmDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            return Result<DairyFarmDto>.Success(dairyFarm);
        }
    }
}