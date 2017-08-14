import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'
import {Location, LocationProvider} from "../location/location"

@Injectable()
export class WeatherProvider {
  apiKey: string = "ac74811bf3cddfee";
  url: string;

  constructor(public http: Http, private locationProvider: LocationProvider) {
    this.url = this.prepareBasicUrl();
  }

  private prepareBasicUrl(): string {
    return `http://api.wunderground.com/api/${this.apiKey}/conditions/q`
  }

  getWeather() {
    return this.locationProvider.location
      .then(location => this.http.get(this.getUrlForCity(location))
        .map(res => res.json())
        .toPromise());
  }

  private getUrlForCity(location: Location): string {
    let area = location.state != null ? location.state : location.country;
    return `${this.url}/${area}/${location.city}.json`;
  }


}

