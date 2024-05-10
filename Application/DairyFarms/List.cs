using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms;

public class List
{
    public class Query : IRequest<Result<List<DairyFarmDto>>>
    {

    }        

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<List<DairyFarmDto>>>
    {            
        public async Task<Result<List<DairyFarmDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var dailyFarms = await context.DairyFarms.Include(x => x.Photos)
                .ProjectTo<DairyFarmDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<DairyFarmDto>>.Success(dailyFarms);
        }
    }
}