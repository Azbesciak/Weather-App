import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable()
export class LocationProvider {
  get location(): Promise<Location> {
    return this.storage.get(this.CURRENT_LOCATION_KEY)
      .then(location => {
        if (location) {
          this._location = location;
        }
        return location
      })
  }

  private CURRENT_LOCATION_KEY = "currentLocation";
  private _location: Location;

  constructor(private storage: Storage) {}

  public saveCurrentLocation(location: Location) {
    this.storage.set(this.CURRENT_LOCATION_KEY, location);
    this._location = location;
  }

}

export class Location {
  constructor(public city?: string,
              public state?: string,
              public country?: string,
              public zmw?: string) {
  }
}

