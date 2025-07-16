using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Revenue
{
    public Guid Id { get; set; }
    public DateTime SaleDate { get; set; }
    public int CultivatedWeight { get; set; }
    public int SoldWeight { get; set; }
    public int SalePrice { get; set; }
    public int SampleWeight { get; set; }
    public int DonateWeight { get; set; }
    public int Wastage { get; set; }    //To be deleted
    [StringLength(250)]
    public string Remark { get; set; }
    /// <summary>
    /// True if Sale weight is matching with sum of sale register 
    /// </summary>
    public bool Reconciled { get; set; }
    public AppUser AddedBy { get; set; }
    public DateTime AddedDate { get; set; } = DateTime.UtcNow;
}
