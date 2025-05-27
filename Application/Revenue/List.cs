using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Revenue;

public class List
{
    public class Query : IRequest<Result<PagedList<RevenueDto>>>
    {
        public PagingParams Params { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<PagedList<RevenueDto>>>
    {
        public async Task<Result<PagedList<RevenueDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            if (request.ToDate == DateTime.MinValue) 
            {
                DateTime date = DateTime.Now;
                var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
                request.FromDate = firstDayOfMonth;
                request.ToDate = lastDayOfMonth;
            }
            var query = context.Revenues
                .Where(a => a.SaleDate >= request.FromDate && a.SaleDate <= request.ToDate)
                .OrderByDescending(d => d.SaleDate)
                .ProjectTo<RevenueDto>(mapper.ConfigurationProvider)
                .AsQueryable();

            return Result<PagedList<RevenueDto>>.Success(
                await PagedList<RevenueDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize, cancellationToken)
            );
        }
    }
}
