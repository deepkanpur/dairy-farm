using System.ComponentModel.DataAnnotations;

namespace Domain;
public class DairyFarmPhoto
{
    public string Id { get; set; }
    public string Url { get; set; }
    [StringLength(200)]
    public string Description { get; set; }
    public bool IsMain { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public AppUser AddedBy { get; set; }
    public DateTime AddedDate { get; set; }  = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
}
