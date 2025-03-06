namespace Application.DairyFarms;

public class DairyFarmDto
{
    public Guid Id { get; set; }
    public string BusinessName { get; set; }
    public string ContactName { get; set; }
    //[JsonIgnore]
    public string ContactNumber { get; set; }
    public string MaskedContactNumber
    {
        get
        {
            if (ContactNumber == null || ContactNumber.Length < 6) return null;
            return ContactNumber.Substring(6, 4).PadLeft(10, 'X');
        }
    }
    public string Pincode { get; set; }
    public string Address { get; set; }
    public string Area { get; set; }
    public string Landmark { get; set; }
    public string City { get; set; }
    public Int16 BuffaloCount { get; set; }
    public Int16 CowCount { get; set; }
    public int MilkProduction { get; set; }
    public string FodderManagement { get; set; }
    public string SurveyNutrition { get; set; }
    public string SurveyBetterMilkProduction { get; set; }
    public string SurveyBetterFodderManagement { get; set; }
    public string SurveyFodderRequirement { get; set; }
    public string AddedByUserName { get; set; }
    public string LocationUrl { get; set; }
    public ICollection<DairyFarmPhotosDto> Photos { get; set; } = [];

    public DateTime AddedDate { get; set; }
    public string Image { get; set; }
}
