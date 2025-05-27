using Application.Core;

namespace Application.SaleRegisters;

public class SaleRegisterListParams: PagingParams
{
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public Guid DairyFarmId { get; set; }
}
