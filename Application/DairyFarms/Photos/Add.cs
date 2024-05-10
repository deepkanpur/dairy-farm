using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms.Photos;

public class Add
{
    public class Command : IRequest<Result<DairyFarmPhoto>>
    {
        public Guid FarmId { get; set; }
        public AddPhotoRequest DairyFarmPhoto { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.DairyFarmPhoto.Longitude).NotEmpty();
            RuleFor(x => x.DairyFarmPhoto.Latitude).NotEmpty();
            RuleFor(x => x.DairyFarmPhoto.File).NotEmpty();
            RuleFor(x => x.FarmId).NotEmpty();
        }
    }

    public class Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor) : IRequestHandler<Command, Result<DairyFarmPhoto>>
    {
        public async Task<Result<DairyFarmPhoto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUserName(), cancellationToken);
            if (user == null) return null;

            var dairyFarm = await context.DairyFarms.Include(x => x.Photos).FirstOrDefaultAsync(x => x.Id == request.FarmId, cancellationToken);
            if (dairyFarm == null) return null;

            var photoUploadResult = await photoAccessor.AddPhoto(request.DairyFarmPhoto.File);

            var photo = new DairyFarmPhoto
            {
                Id = photoUploadResult.PublicId,
                Url = photoUploadResult.Url,
                AddedBy = user,
                Description = request.DairyFarmPhoto.Description,
                Latitude = request.DairyFarmPhoto.Latitude,
                Longitude = request.DairyFarmPhoto.Longitude
            };

            if (!dairyFarm.Photos.Any(p => p.IsMain)) photo.IsMain = true;
            dairyFarm.Photos.Add(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (result) return Result<DairyFarmPhoto>.Success(photo);

            return Result<DairyFarmPhoto>.Failure("Problem adding Dairy Form Photo");
        }
    }
}