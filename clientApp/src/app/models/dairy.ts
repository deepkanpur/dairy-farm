export interface DairyPhoto {
  id: string
  url: string
  description: string
  isMain: boolean
  locationUrl: string;
  addedByUserName: string
}

export interface IDairy {
  id: string;
  businessName: string;
  contactName: string;
  contactNumber: string;
  pincode: string;
  address: string;
  area: string;
  landmark: string;
  city: string;
  buffaloCount: number;
  cowCount: number;
  workerCount: number;
  addedByUserName: string;
  addedDate: Date | null;
  image: string;
  locationUrl: string;
  photos?: DairyPhoto[];
}

export class Dairy implements IDairy {
  id: string;
  businessName: string;
  contactName: string;
  contactNumber: string;
  pincode: string;
  address: string;
  area: string;
  landmark: string;
  city: string;
  buffaloCount: number;
  cowCount: number;
  workerCount: number;
  addedByUserName: string = "";
  addedDate: Date | null = null;
  image: string = "";
  locationUrl: string = "";
  photos?: DairyPhoto[];

  constructor(init: DairyFormValues) {
    this.id = init.id!;
    this.businessName = init.businessName;
    this.contactName = init.contactName;
    this.contactNumber = init.contactNumber;
    this.pincode = init.pincode;
    this.address = init.address;
    this.area = init.area;
    this.landmark = init.landmark;
    this.city = init.city;
    this.buffaloCount = init.buffaloCount;
    this.cowCount = init.cowCount;
    this.workerCount = init.workerCount;
  }
}

export class DairyFormValues {
  id?: string = undefined;
  businessName: string = "";
  contactName: string = "";
  contactNumber: string = "";
  pincode: string = "";
  address: string = "";
  area: string = "";
  landmark: string = "";
  city: string = 'Kanpur';
  buffaloCount: number = 0;
  cowCount: number = 0;
  workerCount: number = 0;
  latitude: number = 26.4097694;
  longitude: number = 80.2554751;

  constructor(dairy?: DairyFormValues) {
    if (dairy) {
      this.id = dairy.id;
      this.businessName = dairy.businessName;
      this.contactName = dairy.contactName;
      this.contactNumber = dairy.contactNumber;
      this.pincode = dairy.pincode;
      this.address = dairy.address;
      this.area = dairy.area;
      this.landmark = dairy.landmark;
      this.city = dairy.city;
      this.buffaloCount = dairy.buffaloCount;
      this.cowCount = dairy.cowCount;
      this.workerCount = dairy.workerCount;
    }
  }
}
