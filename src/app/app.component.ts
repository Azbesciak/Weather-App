import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {TranslateService} from '@ngx-translate/core';
import {I18nProvider} from "../providers/i18n/i18n";

@Component({
  templateUrl: 'app.html'
})
export class iWeather {
  rootPage: any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              translate: TranslateService,
              i18n: I18nProvider) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    }).then(() => i18n.init(translate))
  }
}
