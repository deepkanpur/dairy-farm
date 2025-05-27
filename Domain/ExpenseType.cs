namespace Domain;

public class ExpenseTypeMaster
{
    public Guid Id { get; set; }
    public string ExpenseType { get; set; }
    public bool IsOpEx { get; set; } = true;
    public bool IsActive { get; set; } = true;
}
