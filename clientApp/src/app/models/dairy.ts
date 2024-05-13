export interface DairyPhoto {
  id: string
  url: string
  description: string
  isMain: boolean
  locationUrl: string;
  addedByUserName: string
}

export interface IAddDairyPhoto {
  dairyId: string
  file: Blob
  description: string
  latitude: number
  longitude: number
}

export interface Dairy {
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
  longitude: number;
  latitude: number;
  photos: DairyPhoto[];

  // constructor(init: DairyFormValues) {
  //   this.id = init.id!;
  //   this.businessName = init.businessName;
  //   this.contactName = init.contactName;
  //   this.contactNumber = init.contactNumber;
  //   this.pincode = init.pincode;
  //   this.address = init.address;
  //   this.area = init.area;
  //   this.landmark = init.landmark;
  //   this.city = init.city;
  //   this.buffaloCount = init.buffaloCount as unknown as number;
  //   this.cowCount = init.cowCount as unknown as number;
  //   this.workerCount = init.workerCount as unknown as number;
  //   this.longitude = init.longitude;
  //   this.latitude = init.latitude;
  //   this.photos = [];
  // }
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
  buffaloCount: string | number = '';
  cowCount: string | number = '';
  workerCount: string | number = '';
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
