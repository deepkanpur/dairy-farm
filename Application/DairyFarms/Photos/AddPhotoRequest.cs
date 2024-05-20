using Microsoft.AspNetCore.Http;

namespace Application.DairyFarms.Photos;

public class AddPhotoRequest
{
    public string Description { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public IFormFile File { get; set; }
}