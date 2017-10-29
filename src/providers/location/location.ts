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
  private HISTORICAL_LOCATION = "historicalLocations";
  private _location: Location;

  constructor(private storage: Storage) {}

  public saveCurrentLocation(location: Location) {
    this.storage.set(this.CURRENT_LOCATION_KEY, location);
    this._location = location;
  }

  public addToLocations(location) {
    return this.getHistoricalLocations()
      .then((locations: Array<Location>) => {
        let indexOfThisLocation = locations
          .map(loc => loc.city)
          .indexOf(location.city);
        if (indexOfThisLocation >= 0) {
          locations.splice(indexOfThisLocation, 1);
        }
        locations.unshift(location);
        return this.storage.set(this.HISTORICAL_LOCATION, locations);
      })
  }

  public getHistoricalLocations() {
    return this.storage.get(this.HISTORICAL_LOCATION)
      .then(locations => locations ? locations : [])
  }

}

export class Location {
  constructor(public city?: string,
              public state?: string,
              public country?: string,
              public zmw?: string) {
  }
}

