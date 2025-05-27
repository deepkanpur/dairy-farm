using Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.SaleRegisters;

public class SaleRegisterAddDto
{
    public Guid Id { get; set; }

    public Guid DairyFarmId { get; set; }
    public DateTime SaleDate { get; set; }
    public int SoldWeight { get; set; }
    public int SalePrice { get; set; }
    public string Remark { get; set; }
}
