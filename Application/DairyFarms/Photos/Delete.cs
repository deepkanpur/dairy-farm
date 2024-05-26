using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms.Photos;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid FarmId { get; set; }
        public string Id { get; set; }
    }

    public class Handler(DataContext context, 
        IPhotoAccessor photoAccessor,
        IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.Include(x => x.Photos).FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUserName());
            if (user == null) return null;

            var dairyFarm = await context.DairyFarms.Include(x => x.Photos).FirstOrDefaultAsync(x => x.Id == request.FarmId, cancellationToken);
            if (dairyFarm == null) return null;

            var photo = dairyFarm.Photos.FirstOrDefault(x => x.Id == request.Id);

            if (photo == null) return null;
            if (photo.IsMain) return Result<Unit>.Failure("You can not delete main photo");

            var result = await photoAccessor.DeletePhoto(photo.Id);
            if (result == null) return Result<Unit>.Failure("Problem Deleting photo from Cloudinary");

            dairyFarm.Photos.Remove(photo);
            var dbResult = await context.SaveChangesAsync(cancellationToken) > 0;

            if (dbResult) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem Deleting Farm photo from API");
        }
    }
}
