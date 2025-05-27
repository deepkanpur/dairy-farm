export interface Revenue {
  id: string;
  saleDate: Date;
  cultivatedWeight: number;
  soldWeight: number;
  salePrice: number;
  sampleWeight: number;
  donateWeight: number;
  wastage: number;
  remark: string;
  reconciled: boolean;
  addedByUserName: string;
  addedDate: Date;
}

export class RevenueAddValues {
  id?: string = undefined;
  saleDate: Date = new Date();
  cultivatedWeight: number | string = '';
  soldWeight: number | string = '';
  salePrice: number = 5;
  sampleWeight: number = 0;
  donateWeight: number = 0;
  wastage: number = 0;
  remark: string = '';

  constructor(revenue?: RevenueAddValues) {
    if (revenue) {
      this.id = revenue.id;
      this.saleDate = revenue.saleDate;
      this.cultivatedWeight = revenue.cultivatedWeight;
      this.soldWeight = revenue.soldWeight;
      this.salePrice = revenue.salePrice;
      this.sampleWeight = revenue.sampleWeight;
      this.donateWeight = revenue.donateWeight;
      this.wastage = revenue.wastage;
      this.remark = revenue.remark;
    }
  }
}