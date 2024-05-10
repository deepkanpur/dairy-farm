using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms;

public class Details
{
    public class Query : IRequest<Result<DairyFarmDetailDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<DairyFarmDetailDto>>
    {
        public async Task<Result<DairyFarmDetailDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var dairyFarm = await context.DairyFarms.Include(x => x.Photos)
                .ProjectTo<DairyFarmDetailDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            return Result<DairyFarmDetailDto>.Success(dairyFarm);
        }
    }
}