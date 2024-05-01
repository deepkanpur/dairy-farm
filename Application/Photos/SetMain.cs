using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler(DataContext context, IUserAccessor userAccessor)
            : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(x => x.Photos).FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUserName());
                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                var currentMain = user.Photos.FirstOrDefault(p => p.IsMain);

                if (currentMain != null) currentMain.IsMain = false;

                photo.IsMain = true;

                var dbResult = await context.SaveChangesAsync() > 0;

                if (dbResult) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem Deleting photo from API");
            }
        }
    }
}