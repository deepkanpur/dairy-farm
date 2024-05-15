using Application.Activities;
using Application.DairyFarms;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUserName, o => o.MapFrom(s => 
                    s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName)
                );
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));

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
            
        }
        
    }
}