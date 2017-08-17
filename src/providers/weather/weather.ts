import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise"
import {Location, LocationProvider} from "../location/location"
import {I18nProvider} from "../i18n/i18n";
import {Storage} from "@ionic/storage";
import {RefresherProvider} from "../refresher/refresher";
import { Http } from "@angular/http";

@Injectable()
export class WeatherProvider {
  private apiKey: string = "ac74811bf3cddfee";
  private CURRENT_WEATHER_KEY = "currentWeather";
  private basicUrl: string;

  constructor(public http: Http,
              private locationProvider: LocationProvider,
              private i18n: I18nProvider,
              private storage: Storage,
              private refresher: RefresherProvider) {
    this.basicUrl = this.getBasicURL();
  }

  private getBasicURL(): string {
    return `http://api.wunderground.com/api/${this.apiKey}`;
  }

  private getConditionsURL(): string {
    let currentLanguage = this.i18n.getCurrentLanguage();
    return `${this.basicUrl}/conditions/lang:${currentLanguage.code.toUpperCase()}/q`
  }

  public getWeather(refresh: boolean = false): Promise<Weather> {
    return this.checkWeatherInStorage()
      .then((weather: Weather) => {
        if (weather && !refresh)
          return weather;
        else
          return this.getWeatherFromApi()
            .then(res => this.updateAndGetWeather(this.getObservationFromResponse(res)))
      })
  }

  private getWeatherFromApi(): Promise<Weather> {
    return this.locationProvider.location
      .then(location => this.getWeatherForLocation(location)
        .then(res => this.setLocationIfUnknown(res, location))
      )
  }

  public getWeatherForLocation(location): Promise<any> {
    return this.http.get(this.getWeatherURL(location))
      .map(res => res.json())
      .toPromise();
  }

  private setLocationIfUnknown(res: any, location?: Location): any {
    let currentObservation = this.getObservationFromResponse(res);
    if (!location && currentObservation) {
      this.locationProvider.saveCurrentLocation(currentObservation.display_location)
    }
    return res;
  }

  private checkWeatherInStorage(): Promise<Weather> {
    return this.storage.get(this.CURRENT_WEATHER_KEY).then((weather: Weather) => {
      if (this.canUseStoredWeather(weather)) {
        return weather;
      } else {
        return null;
      }
    })
  }

  private canUseStoredWeather(weather: Weather): Promise<boolean> {
    return this.refresher.refreshTime
      .then((period: number) => weather && this.isUpToDate(weather, period))
  }

  private isUpToDate(weather: Weather, period: number): boolean {
    return (new Date().getTime() - weather.timestamp) < period;
  }

  public updateAndGetWeather(observation: any): Weather {
    let weather = new Weather(new Date().getTime(), observation);
    this.storage.set(this.CURRENT_WEATHER_KEY, weather);
    return weather;
  }

  public getObservationFromResponse(res: any): any {
    if (res)
      return res.current_observation;
  }

  private getWeatherURL(location?: Location): string {
    if (location) {
      return this.getURLForSelectedLocation(location)
    } else {
      return this.getURLForIp();
    }
  }

  private getURLForSelectedLocation(location: Location): string {
    if (location.zmw) {
      return this.getWeatherURLQuery(`zmw:${location.zmw}`)
    } else {
      let area = location.state != null ? location.state : location.country;
      return this.getWeatherURLQuery(`${area}/${location.city}`)
    }
  }

  private getURLForIp(): string {
    return this.getWeatherURLQuery(`autoip`);
  }

  private getWeatherURLQuery(query: string): string {
    return `${this.getConditionsURL()}/${query}.json`;
  }
}

export class Weather {
  constructor(public timestamp,
              public observation) {
  }
}

