import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private weather: any;

  constructor(public navCtrl: NavController,
              private weatherProvider: WeatherProvider) {

  }

  ionViewWillEnter() {
    this.weatherProvider
      .getWeather()
      .then(weather => this.weather = weather.current_observation)
  }


}
