namespace Application.DairyFarms;

public class DairyFarmDto
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
    public string AddedByUserName { get; set; }
    public string LocationUrl { get; set; }
    public ICollection<DairyFarmPhotosDto> Photos { get; set; } = [];

    public DateTime AddedDate { get; set; }
    public string Image { get; set; }
}
