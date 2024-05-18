using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DairyFarms.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid DairyFarmId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) 
            : IRequestHandler<Command, Result<CommentDto>>
        {
            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var dairyFarm = await dataContext.DairyFarms.FindAsync(request.DairyFarmId, cancellationToken);

                if (dairyFarm == null) return null;

                var user = await dataContext.Users
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName(), cancellationToken);

                var comment = new Comment
                {
                    Body = request.Body,
                    Author = user,
                    DairyFarm = dairyFarm,
                    CreatedAt = DateTime.UtcNow
                };

                dairyFarm.Comments.Add(comment);

                var success = await dataContext.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Result<CommentDto>.Success(mapper.Map<CommentDto>(comment));

                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}