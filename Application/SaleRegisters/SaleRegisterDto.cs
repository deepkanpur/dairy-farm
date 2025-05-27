namespace Application.SaleRegisters;

public class SaleRegisterDto
{
    public Guid Id { get; set; }

    public string DairyFarmBusinessName { get; set; }
    public DateTime SaleDate { get; set; }
    public int SoldWeight { get; set; }
    public int SalePrice { get; set; }    
    public string Remark { get; set; }
    public string AddedByUserName { get; set; }
    public DateTime AddedDate { get; set; }
}
