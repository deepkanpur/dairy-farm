using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string UserName { get; set; }
        }

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<Profile>>
        {
            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(x => x.Photos)
                    .ProjectTo<Profile>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.UserName == request.UserName);

                return Result<Profile>.Success(user);
            }
        }
    }
}