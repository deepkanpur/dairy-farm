import { useGeolocated } from "react-geolocated";
export class Coordinates {
  latitude: number = 26.4097694;
  longitude: number = 80.25546;
  isGeolocationAvailable: boolean = false;
  isGeolocationEnabled: boolean = false;
}
export default class GeoLocation {
    
  getCoords = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
      useGeolocated({
        positionOptions: {
          enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
      });

    const coordinates = new Coordinates();
    coordinates.isGeolocationAvailable = isGeolocationAvailable;
    coordinates.isGeolocationEnabled = isGeolocationEnabled;
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      coordinates.latitude = coords.latitude;
      coordinates.longitude = coords.longitude;
    }
    return coordinates;
  };
}
