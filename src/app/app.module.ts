import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { iWeather } from "./app.component";

import { HomePage } from "../pages/home/home";
import { SettingsPage } from "../pages/settings/settings"

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { WeatherProvider } from "../providers/weather/weather";
import { IonicStorageModule } from "@ionic/storage";
import { LocationProvider } from "../providers/location/location";
import { I18nProvider } from "../providers/i18n/i18n";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Globalization } from "@ionic-native/globalization";
import { RefresherProvider } from "../providers/refresher/refresher";
import { TimeAgoPipeModule } from "time-ago-pipe/index";

export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    iWeather,
    HomePage,
    SettingsPage,
  ],
  imports: [
    TimeAgoPipeModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(iWeather),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    iWeather,
    HomePage,
    SettingsPage
  ],
  providers: [
    Globalization,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherProvider,
    LocationProvider,
    I18nProvider,
    RefresherProvider
  ]
})
export class AppModule {
}
