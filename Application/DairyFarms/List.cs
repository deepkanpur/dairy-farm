using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms;

public class List
{
    public class Query : IRequest<Result<PagedList<DairyFarmDto>>>
    {
        public PagingParams Params { get; set; }
    }        

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<PagedList<DairyFarmDto>>>
    {
        public async Task<Result<PagedList<DairyFarmDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.DairyFarms.Where(a => a.IsActive)
                .Include(x => x.Photos)
                .ProjectTo<DairyFarmDto>(mapper.ConfigurationProvider)
                .AsQueryable();

            return Result<PagedList<DairyFarmDto>>.Success(
                await PagedList<DairyFarmDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize, cancellationToken)
            );
        }
    }
}