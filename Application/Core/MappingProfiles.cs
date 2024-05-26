using Application.DairyFarms;
using Application.DairyFarms.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {   
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<DairyFarm, DairyFarmDto>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.AddedByUserName, o=> o.MapFrom(s => s.AddedBy.DisplayName))
                .ForMember(d => d.LocationUrl, o=> o.MapFrom(s => 
                    "http://maps.google.com/maps?q=loc:" 
                    + s.Latitude + "+" 
                    + s.Longitude));
            
            CreateMap<DairyFarmPhoto, DairyFarmPhotosDto>()
                .ForMember(d => d.AddedByUserName, o => o.MapFrom(s => s.AddedBy.DisplayName))
                .ForMember(d => d.Original, o => o.MapFrom(s => s.Url))
                .ForMember(d => d.LocationUrl, o=> o.MapFrom(s => 
                    "http://maps.google.com/maps?q=loc:" 
                    + s.Latitude + "+" 
                    + s.Longitude));
            
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
        
    }
}