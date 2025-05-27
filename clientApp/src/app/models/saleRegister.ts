export interface SaleRegister {
  id: string;
  dairyFarmBusinessName: string
  dairyFarmId: string
  saleDate: Date;
  soldWeight: number;
  salePrice: number;
  remark: string;
  addedByUserName: string;
  addedDate: Date;
}

export class SaleRegisterAddValues {
  id?: string = undefined;
  dairyFarmId: string = '';
  saleDate: Date = new Date();
  soldWeight: number | string = '';
  salePrice: number = 5;
  remark: string = '';

  constructor(revenue?: SaleRegisterAddValues) {
    if (revenue) {
      this.id = revenue.id;
      this.dairyFarmId = revenue.dairyFarmId;
      this.saleDate = revenue.saleDate;
      this.soldWeight = revenue.soldWeight;
      this.salePrice = revenue.salePrice;
      this.remark = revenue.remark;
    }
  }
}

export interface SaleListParam {
    pageNumber: number;
    pageSize: number;
    fromDate: Date;  
    toDate: Date;
    dairyFarmId?: string;
}
