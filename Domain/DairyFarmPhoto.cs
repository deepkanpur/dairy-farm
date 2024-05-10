namespace Domain;
public class DairyFarmPhoto
{
    public string Id { get; set; }
    public string Url { get; set; }
    public string Description { get; set; }
    public bool IsMain { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public AppUser AddedBy { get; set; }
    public DateTime AddedDate { get; set; }  = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
}
