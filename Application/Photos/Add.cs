using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Photo>>
        {
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(x => x.Photos).FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUserName());
                if(user == null) return null;

                var photoUploadResult = await photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url
                };
                
                if(!user.Photos.Any(p => p.IsMain)) photo.IsMain = true;
                user.Photos.Add(photo);
                
                var result = await context.SaveChangesAsync() > 0;

                if(result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem adding photo");
            }
        }
    }
}