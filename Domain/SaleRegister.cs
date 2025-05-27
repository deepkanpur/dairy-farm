using System.ComponentModel.DataAnnotations;

namespace Domain;

public class SaleRegister
{
    public Guid Id { get; set; }

    public DairyFarm DairyFarm { get; set; }
    public DateTime SaleDate { get; set; }
    public int SoldWeight { get; set; }
    public int SalePrice { get; set; }
    [StringLength(250)]
    public string Remark { get; set; }
    public AppUser AddedBy { get; set; }
    public DateTime AddedDate { get; set; } = DateTime.Now;
}
