export interface DairyPhoto {
  id: string
  original: string
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
  maskedContactNumber: string
  pincode: string;
  address: string;
  area: string;
  landmark: string;
  city: string;
  buffaloCount: number;
  cowCount: number;
  milkProduction: number;
  fodderManagement: string;
  surveyNutrition: string;
  surveyBetterMilkProduction: string;
  surveyBetterFodderManagement: string;
  surveyFodderRequirement: string;
  addedByUserName: string;
  addedDate: Date | null;
  image: string;
  locationUrl: string;
  longitude: number;
  latitude: number;
  photos: DairyPhoto[];
  
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
  milkProduction: string | number = '';
  fodderManagement: string = '';
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
      this.milkProduction = dairy.milkProduction; 
      this.fodderManagement = dairy.fodderManagement;     
    }
  }
}
