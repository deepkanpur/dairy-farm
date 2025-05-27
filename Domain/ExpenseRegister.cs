using System.ComponentModel.DataAnnotations;

namespace Domain;

public class ExpenseRegister
{
    public Guid Id { get; set; }

    public ExpenseTypeMaster ExpenseType { get; set; }
    public DateTime Date { get; set; }
    public int Amount { get; set; }
    [StringLength(250)]
    public string Description { get; set; }
    public bool IsActive { get; set; } = true;
    public AppUser AddedBy { get; set; }
    public DateTime AddedDate { get; set; } = DateTime.UtcNow;
}
