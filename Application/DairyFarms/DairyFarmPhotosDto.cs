namespace Application.DairyFarms;
public class DairyFarmPhotosDto
{
    public string Id { get; set; }
    public string Url { get; set; }
    public string Description { get; set; }
    public bool IsMain { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public string AddedByUserName { get; set; }
}