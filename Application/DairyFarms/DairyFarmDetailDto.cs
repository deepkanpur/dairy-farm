namespace Application.DairyFarms;

public class DairyFarmDetailDto : DairyFarmDto
{
    public ICollection<DairyFarmPhotosDto> Photos { get; set; } = [];
}
