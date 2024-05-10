using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms.Photos;

public class SetMain
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid FarmId { get; set; }
        public string Id { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var dairyFarm = await context.DairyFarms.Include(x => x.Photos).FirstOrDefaultAsync(x => x.Id == request.FarmId, cancellationToken);
            if (dairyFarm == null) return null;

            var photo = dairyFarm.Photos.FirstOrDefault(x => x.Id == request.Id);

            if (photo == null) return null;

            var currentMain = dairyFarm.Photos.FirstOrDefault(p => p.IsMain);

            if (currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            var dbResult = await context.SaveChangesAsync() > 0;

            if (dbResult) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem setting Farm Main photo from API");
        }
    }
}
