namespace Application.Revenue;

public class RevenueDto
{
    public Guid Id { get; set; }
    public DateTime SaleDate { get; set; }
    public int CultivatedWeight { get; set; }
    public int SoldWeight { get; set; }
    public int SalePrice { get; set; }
    public int SampleWeight { get; set; }
    public int DonateWeight { get; set; }
    public int Wastage { get; set; }
    public string Remark { get; set; }
    public bool Reconciled { get; set; }
    public string AddedByUserName { get; set; }
    public DateTime AddedDate { get; set; }
}
