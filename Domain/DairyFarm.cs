namespace Domain;
public class DairyFarm
{
    public Guid Id { get; set; }
    public string BusinessName { get; set; }
    public string ContactName { get; set; }
    public string ContactNumber { get; set; }
    public string Pincode { get; set; }
    public string Address { get; set; }
    public string Area { get; set; }
    public string Landmark { get; set; }
    public string City { get; set; }
    public Int16 BuffaloCount { get; set; }
    public Int16 CowCount { get; set; }
    public Int16 WorkerCount { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public AppUser AddedBy { get; set; }
    public DateTime AddedDate { get; set; }  = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
    public ICollection<DairyFarmPhoto> Photos { get; set; } = [];
}
