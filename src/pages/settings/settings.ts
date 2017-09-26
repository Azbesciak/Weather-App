import { Component } from "@angular/core";
import { AlertController, IonicPage, NavController } from "ionic-angular";
import { Location, LocationProvider } from "../../providers/location/location";
import { WeatherProvider } from "../../providers/weather/weather";
import { Subject } from "rxjs/Subject";
import { RefresherProvider } from "../../providers/refresher/refresher";
import * as moment from "moment";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html",
})
export class SettingsPage {

  private location: Location;
  private weatherRefreshPeriod: string;
  private selectionResult;
  private selectionWatcher;
  periodFormat = "HH:mm";

  constructor(public navCtrl: NavController,
              private locationProvider: LocationProvider,
              private weather: WeatherProvider,
              private alertCtrl: AlertController,
              private refresher: RefresherProvider) {
    this.selectionResult = new Subject();
    this.selectionWatcher = this.selectionResult.subscribe(location => this.onLocationChanged(location));
    this.location = new Location();
    this.locationProvider.location
      .then(location => {
        if (location)
          this.location = location
      });
    this.refresher.getRefreshTime()
      .then(time => {
        this.weatherRefreshPeriod = moment(time).utcOffset(0).format(this.periodFormat)
      })
  }

  private onLocationChanged(location: Location) {
    this.changeCurrentLocation(location);
    this.weather.getWeather(true).then(() => this.goToHomePage());
  }

  private changeCurrentLocation(location: Location) {
    this.location = location;
    this.locationProvider.saveCurrentLocation(location);
  }

  saveForm() {
    this.updateRefreshPeriod();
    this.locationProvider.location
      .then(location => {
        if (location && this.locationChanged(location)) {
          this.changeCurrentLocation(new Location(this.location.city, this.location.state));
        }
        this.checkWeatherForLocation(this.location).then(locationCorrect => {
          if (locationCorrect) {
            this.goToHomePage();
          }
        });
      })
  }

  private updateRefreshPeriod() {
    const period = moment(this.weatherRefreshPeriod, this.periodFormat);
    const minutes = period.minutes() + period.hours() * 60;
    this.refresher.setRefreshTime(minutes);
  }

  private locationChanged(location) {
    return (location.city != this.location.city || location.state != this.location.state);
  }

  private goToHomePage() {
    this.navCtrl.pop();
  }

  private checkWeatherForLocation(location: Location): Promise<boolean> {
    return this.weather.getWeatherForLocation(location).then(res => {
        let observation = this.weather.getObservationFromResponse(res);
        if (observation) {
          let weather = this.weather.updateAndGetWeather(observation);
          this.getLocationFromWeatherIfCurrentWrong(location, weather);
          return Promise.resolve(true);
        } else {
          const otherResponse = res.response;
          if (otherResponse.error) {
            this.showErrorAlert(otherResponse.error.description);
          } else if (otherResponse.results) {
            this.showCityChoseAlert(otherResponse.results);
          }
          return Promise.resolve(false);
        }
      }
    )
  }

  private getLocationFromWeatherIfCurrentWrong(location, weather) {
    if (!location.country) {
      this.changeCurrentLocation(weather.observation.display_location)
    }
  }

  private showErrorAlert(error: string) {
    let alert = this.alertCtrl.create({
      title: "Error",
      subTitle: error,
      buttons: ["OK"]
    });
    alert.present();
  }

  private showCityChoseAlert(results: any[]) {
    let alert = this.alertCtrl.create();
    alert.setTitle("Selection is ambiguous, select one");

    results.forEach(result => alert.addInput({
      type: "radio",
      label: `${result.city}, ${result.state}, ${result.country_name}`,
      value: result
    }));

    alert.addButton("Cancel");
    alert.addButton({
      text: "Okay",
      handler: location => this.selectLocation(location)
    });
    return alert.present();
  }

  private selectLocation(location) {
    this.selectionResult.next(location);
  }
}
