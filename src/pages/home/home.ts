import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather"
import { SettingsPage } from "../settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private weather: any;
  private recentUpdate: number;

  settingPage = SettingsPage;

  constructor(public navCtrl: NavController,
              private weatherProvider: WeatherProvider) {

  }

  ionViewWillEnter() {
    this.getWeather();
  }

  refreshWeather(refresher) {
    this.getWeather(true)
      .then(() => refresher.complete())
  }

  private getWeather(isRefresh: boolean = false) {
    return this.weatherProvider
      .getWeather(isRefresh)
      .then(weather => {
        this.weather = weather.observation;
        this.recentUpdate = weather.timestamp;
      })
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }


}
