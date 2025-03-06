using System.ComponentModel.DataAnnotations;

namespace Domain;
public class DairyFarm
{
    public Guid Id { get; set; }
    [StringLength(100)]
    public string BusinessName { get; set; }
    [StringLength(100)]
    public string ContactName { get; set; }
    [StringLength(15)]
    public string ContactNumber { get; set; }
    [StringLength(10)]
    public string Pincode { get; set; }
    [StringLength(200)]
    public string Address { get; set; }
    [StringLength(50)]
    public string Area { get; set; }
    [StringLength(200)]
    public string Landmark { get; set; }
    [StringLength(100)]
    public string City { get; set; }
    public Int16 BuffaloCount { get; set; }
    public Int16? CowCount { get; set; }
    public int MilkProduction { get; set; }
    [StringLength(500)]
    public string FodderManagement { get; set; }
    [StringLength(50)]
    public string SurveyNutrition { get; set; }
    [StringLength(50)]
    public string SurveyBetterMilkProduction { get; set; }
    [StringLength(100)]
    public string SurveyBetterFodderManagement { get; set; }
    [StringLength(100)]
    public string SurveyFodderRequirement { get; set; }
    [StringLength(1000)]
    public string Remark { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public AppUser AddedBy { get; set; }
    public DateTime AddedDate { get; set; }  = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
    public ICollection<DairyFarmPhoto> Photos { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];
}
