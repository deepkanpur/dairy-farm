using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Salary
{
    public Guid Id { get; set; }
    public AppUser Staff { get; set; }
    public int Amount { get; set; }
    public DateTime PayDate { get; set; }

    [StringLength(250)]
    public string Remark { get; set; }
    public AppUser AddedBy { get; set; }
    public DateTime AddedDate { get; set; }
}
