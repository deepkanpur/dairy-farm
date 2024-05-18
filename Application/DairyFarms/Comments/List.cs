using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid DairyFarmId { get; set; }
        }

        public class Handler(DataContext dataContext, IMapper mapper) 
            : IRequestHandler<Query, Result<List<CommentDto>>>
        {
            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {   
                var commentDtoList = await dataContext.Comments
                    .Where(x => x.DairyFarm.Id == request.DairyFarmId)
                    .OrderByDescending(x => x.CreatedAt)
                    .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                if (commentDtoList == null) return null;

                return Result<List<CommentDto>>.Success(commentDtoList);
            }
        }
    }
}