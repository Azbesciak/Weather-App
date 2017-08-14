import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {isUndefined} from "ionic-angular/util/util";

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationProvider {
  get location(): Promise<Location> {
    if (isUndefined(this._location)) {
      return this.initLocation().then(() => this._location)
    }
    return Promise.resolve(this._location);
  }
  private LOCATION_KEY = "_location";
  private _location: Location;

  constructor(private storage: Storage) {}

  private initLocation() {
    return this.storage.get(this.LOCATION_KEY)
      .then(location => {
        if (location != null) {
          this._location = location;

        } else {
          this._location = new Location("San_Francisco", null, "CA");
          this.saveLocation(this._location)
        }
      })
  }

  public saveLocation(location: Location) {
    this.storage.set(this.LOCATION_KEY, location);
    this._location = location;
  }

}

export class Location {
  constructor(public city: string = null,
              public country: string = null,
              public state: string = null) {
  }
}

