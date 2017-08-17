import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private weather: any;
  private recetUpdate: number;

  constructor(public navCtrl: NavController,
              private weatherProvider: WeatherProvider) {

  }

  ionViewWillEnter() {
    this.getWeather();
  }

  private getWeather(isRefresh: boolean = false) {
    this.weatherProvider
      .getWeather(isRefresh)
      .then(weather => {
        this.weather = weather.observation;
        this.recetUpdate = weather.timestamp;
      })
  }


}
