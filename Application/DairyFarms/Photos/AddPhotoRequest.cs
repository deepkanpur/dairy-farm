using Microsoft.AspNetCore.Http;

namespace Application.DairyFarms.Photos;

public class AddPhotoRequest
{
    public string Description { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public IFormFile File { get; set; }
}