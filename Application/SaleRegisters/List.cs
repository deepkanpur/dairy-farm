using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.SaleRegisters;

public class List
{
    public class Query : IRequest<Result<PagedList<SaleRegisterDto>>>
    {
        public PagingParams Params { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public Guid DairyFarmId { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<PagedList<SaleRegisterDto>>>
    {
        public async Task<Result<PagedList<SaleRegisterDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            if (request.ToDate == DateTime.MinValue)
            {
                DateTime date = DateTime.Now;
                var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
                request.FromDate = firstDayOfMonth;
                request.ToDate = lastDayOfMonth;
            }
            var query = context.SaleRegister
                .Where(a => a.SaleDate >= request.FromDate.Date && a.SaleDate < request.ToDate.Date.AddDays(1));

            if (request.DairyFarmId != Guid.Empty)
                query = query.Where(x => x.DairyFarm.Id == request.DairyFarmId);

            var queryDto = query.OrderByDescending(d => d.SaleDate)
                .ProjectTo<SaleRegisterDto>(mapper.ConfigurationProvider)
                .AsQueryable();

            return Result<PagedList<SaleRegisterDto>>.Success(
                await PagedList<SaleRegisterDto>.CreateAsync(queryDto, request.Params.PageNumber, request.Params.PageSize, cancellationToken)
            );
        }
    }
}
