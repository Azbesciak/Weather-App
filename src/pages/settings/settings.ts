import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Location, LocationProvider} from "../../providers/location/location";
import {HomePage} from "../home/home";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private location: Location;
  constructor(public navCtrl: NavController, public navParams: NavParams, private locationProvider: LocationProvider) {
    this.locationProvider.location
      .then(location => this.location = location);
  }

  ionViewDidLoad() {
  }

  saveForm() {
    this.locationProvider.saveLocation(this.location);
    this.navCtrl.insert(0, HomePage).then(() => this.navCtrl.pop());
  }
}
