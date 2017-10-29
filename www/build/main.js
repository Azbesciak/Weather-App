webpackJsonp([1],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_location_location__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_weather_weather__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_refresher_refresher__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SettingsPage = (function () {
    function SettingsPage(navCtrl, locationProvider, weather, alertCtrl, refresher) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.locationProvider = locationProvider;
        this.weather = weather;
        this.alertCtrl = alertCtrl;
        this.refresher = refresher;
        this.periodFormat = "HH:mm";
        this.selectionResult = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.selectionWatcher = this.selectionResult.subscribe(function (location) { return _this.onLocationChanged(location); });
        this.location = new __WEBPACK_IMPORTED_MODULE_2__providers_location_location__["a" /* Location */]();
        this.locationProvider.location
            .then(function (location) {
            if (location)
                _this.location = location;
        });
        this.refresher.getRefreshTime()
            .then(function (time) {
            _this.weatherRefreshPeriod = __WEBPACK_IMPORTED_MODULE_6_moment__(time).utcOffset(0).format(_this.periodFormat);
        });
        this.updateLocations();
    }
    SettingsPage.prototype.updateLocations = function () {
        var _this = this;
        this.locationProvider.getHistoricalLocations()
            .then(function (locations) { return _this.historicalLocations = locations; });
    };
    SettingsPage.prototype.onLocationChanged = function (location) {
        var _this = this;
        this.changeCurrentLocation(location);
        this.weather.getWeather(true).then(function () { return _this.goToHomePage(); });
    };
    SettingsPage.prototype.changeCurrentLocation = function (location) {
        this.location = location;
        this.locationProvider.saveCurrentLocation(location);
    };
    SettingsPage.prototype.saveForm = function () {
        this.updateRefreshPeriod();
        this.saveLocation();
    };
    SettingsPage.prototype.chooseLocationFromHistory = function (location) {
        this.location = location;
        this.saveLocation();
    };
    SettingsPage.prototype.saveLocation = function () {
        var _this = this;
        this.locationProvider.location
            .then(function (location) {
            if (location && _this.locationChanged(location)) {
                _this.changeCurrentLocation(new __WEBPACK_IMPORTED_MODULE_2__providers_location_location__["a" /* Location */](_this.location.city, _this.location.state));
                _this.addLocationToHistory(location);
            }
            _this.checkWeatherForLocation(_this.location)
                .then(function (locationCorrect) {
                if (locationCorrect)
                    _this.goToHomePage();
            });
        });
    };
    SettingsPage.prototype.updateRefreshPeriod = function () {
        var period = __WEBPACK_IMPORTED_MODULE_6_moment__(this.weatherRefreshPeriod, this.periodFormat);
        var minutes = period.minutes() + period.hours() * 60;
        this.refresher.setRefreshTime(minutes);
    };
    SettingsPage.prototype.locationChanged = function (location) {
        return (location.city != this.location.city || location.state != this.location.state);
    };
    SettingsPage.prototype.addLocationToHistory = function (location) {
        var _this = this;
        this.locationProvider.addToLocations(location)
            .then(function () { return _this.updateLocations(); })
            .then(function () { return console.log(_this.historicalLocations); });
    };
    SettingsPage.prototype.goToHomePage = function () {
        this.navCtrl.pop();
    };
    SettingsPage.prototype.checkWeatherForLocation = function (location) {
        var _this = this;
        return this.weather.getWeatherForLocation(location).then(function (res) {
            var observation = _this.weather.getObservationFromResponse(res);
            if (observation) {
                var weather = _this.weather.updateAndGetWeather(observation);
                _this.getLocationFromWeatherIfCurrentWrong(location, weather);
                return Promise.resolve(true);
            }
            else {
                var otherResponse = res.response;
                if (otherResponse.error) {
                    _this.showErrorAlert(otherResponse.error.description);
                }
                else if (otherResponse.results) {
                    _this.showCityChoseAlert(otherResponse.results);
                }
                return Promise.resolve(false);
            }
        });
    };
    SettingsPage.prototype.getLocationFromWeatherIfCurrentWrong = function (location, weather) {
        if (!location.country) {
            this.changeCurrentLocation(weather.observation.display_location);
        }
    };
    SettingsPage.prototype.showErrorAlert = function (error) {
        var alert = this.alertCtrl.create({
            title: "Error",
            subTitle: error,
            buttons: ["OK"]
        });
        alert.present();
    };
    SettingsPage.prototype.showCityChoseAlert = function (results) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle("Selection is ambiguous, select one");
        results.forEach(function (result) { return alert.addInput({
            type: "radio",
            label: result.city + ", " + result.state + ", " + result.country_name,
            value: result
        }); });
        alert.addButton("Cancel");
        alert.addButton({
            text: "Okay",
            handler: function (location) { return _this.selectLocation(location); }
        });
        return alert.present();
    };
    SettingsPage.prototype.selectLocation = function (location) {
        this.selectionResult.next(location);
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "page-settings",template:/*ion-inline-start:"C:\Projects\iweather\src\pages\settings\settings.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ "SETTINGS" | translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n      <ion-list>\n        <ion-item>\n          <ion-label fixed>{{ \'CITY\' | translate }}</ion-label>\n          <ion-input [(ngModel)]="location.city" name="city" type="text"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label fixed>{{\'REFRESH_PERIOD\' | translate}} </ion-label>\n          <ion-datetime [displayFormat]="periodFormat" pickerFormat="HH mm" [(ngModel)]="weatherRefreshPeriod"></ion-datetime>\n        </ion-item>\n      </ion-list>\n    <ion-list padding-top="50">\n      <ion-list-header>\n        {{ \'HISTORY\' | translate }}lama\n      </ion-list-header>\n      <ion-item *ngFor="let loc of historicalLocations" (click)="chooseLocationFromHistory(loc)">\n        <ion-label fixed>{{loc.city}}</ion-label>\n      </ion-item>\n    </ion-list>\n</ion-content>\n<ion-footer>\n  <button ion-button block id="save-changes" (click)="saveForm()">{{\'SAVE_CHANGES\' | translate}}</button>\n</ion-footer>\n'/*ion-inline-end:"C:\Projects\iweather\src\pages\settings\settings.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_location_location__["b" /* LocationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_location_location__["b" /* LocationProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_weather_weather__["a" /* WeatherProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_weather_weather__["a" /* WeatherProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__providers_refresher_refresher__["a" /* RefresherProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_refresher_refresher__["a" /* RefresherProvider */]) === "function" && _e || Object])
], SettingsPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 127;

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/settings/settings.module": [
		425,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 168;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_weather_weather__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, weatherProvider) {
        this.navCtrl = navCtrl;
        this.weatherProvider = weatherProvider;
        this.settingPage = __WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */];
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.getWeather();
    };
    HomePage.prototype.refreshWeather = function (refresher) {
        this.getWeather(true)
            .then(function () { return refresher.complete(); });
    };
    HomePage.prototype.getWeather = function (isRefresh) {
        var _this = this;
        if (isRefresh === void 0) { isRefresh = false; }
        return this.weatherProvider
            .getWeather(isRefresh)
            .then(function (weather) {
            _this.weather = weather.observation;
            _this.recentUpdate = weather.timestamp;
        });
    };
    HomePage.prototype.goToSettings = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Projects\iweather\src\pages\home\home.html"*/'<ion-content padding class="home">\n  <ion-refresher (ionRefresh)="refreshWeather($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-grid *ngIf="weather">\n    <ion-row>\n      <ion-col width-50 offset-25>\n        <div class="location">{{weather.display_location.city}}, {{weather.display_location.state}}</div>\n        <div class="icon"><img src="{{weather.icon_url}}"></div>\n        <div class="desc">{{weather.weather}}</div>\n        <div class="temp">{{weather.temp_c}}&deg;C</div>\n      </ion-col>\n    </ion-row>\n    <ion-row justify-content-end>\n      <ion-badge *ngIf="recentUpdate" class="refresh-date">\n        <ion-icon name="time"></ion-icon>\n        <span class="timer">{{recentUpdate | timeAgo}}</span>\n      </ion-badge>\n    </ion-row>\n    <ion-row>\n      <ion-col width-100>\n        <ion-list>\n          <ion-item>\n            <strong>{{"TEMP" | translate}}: </strong> {{weather.temperature_string}}\n          </ion-item>\n\n          <ion-item>\n            <strong>{{"REL_HUM" | translate}}: </strong> {{weather.relative_humidity}}\n          </ion-item>\n\n          <ion-item>\n            <strong>{{"DEWPOINT" | translate}}: </strong> {{weather.dewpoint_string}}\n          </ion-item>\n\n          <ion-item>\n            <strong>{{"VISIBILITY" | translate}}: </strong> {{weather.visibility_km}}\n          </ion-item>\n          <ion-item>\n            <strong>{{"HEAT_INDEX" | translate}}: </strong> {{weather.heat_index_string}}\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-fab right bottom>\n    <button ion-fab color="light" (click)="goToSettings()"><ion-icon name="build"></ion-icon></button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"C:\Projects\iweather\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_weather_weather__["a" /* WeatherProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(350);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_weather_weather__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_location_location__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_i18n_i18n__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_http_loader__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_globalization__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_refresher_refresher__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_time_ago_pipe_index__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_time_ago_pipe_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_time_ago_pipe_index__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_12__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, "./assets/i18n/", ".json");
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* iWeather */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__["a" /* SettingsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_17_time_ago_pipe_index__["TimeAgoPipeModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* iWeather */], {}, {
                links: [
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_14__angular_common_http__["a" /* HttpClient */]]
                }
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* iWeather */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__["a" /* SettingsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_globalization__["a" /* Globalization */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_8__providers_weather_weather__["a" /* WeatherProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_location_location__["b" /* LocationProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_i18n_i18n__["a" /* I18nProvider */],
            __WEBPACK_IMPORTED_MODULE_16__providers_refresher_refresher__["a" /* RefresherProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Language */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return availableLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultLanguage; });
var Language = (function () {
    function Language() {
    }
    return Language;
}());

var english = {
    code: 'en',
    name: 'English'
};
var polish = {
    code: 'pl',
    name: 'Polish'
};
var availableLanguages = [english, polish];
var defaultLanguage = english;
//# sourceMappingURL=language.js.map

/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 173,
	"./af.js": 173,
	"./ar": 174,
	"./ar-dz": 175,
	"./ar-dz.js": 175,
	"./ar-kw": 176,
	"./ar-kw.js": 176,
	"./ar-ly": 177,
	"./ar-ly.js": 177,
	"./ar-ma": 178,
	"./ar-ma.js": 178,
	"./ar-sa": 179,
	"./ar-sa.js": 179,
	"./ar-tn": 180,
	"./ar-tn.js": 180,
	"./ar.js": 174,
	"./az": 181,
	"./az.js": 181,
	"./be": 182,
	"./be.js": 182,
	"./bg": 183,
	"./bg.js": 183,
	"./bn": 184,
	"./bn.js": 184,
	"./bo": 185,
	"./bo.js": 185,
	"./br": 186,
	"./br.js": 186,
	"./bs": 187,
	"./bs.js": 187,
	"./ca": 188,
	"./ca.js": 188,
	"./cs": 189,
	"./cs.js": 189,
	"./cv": 190,
	"./cv.js": 190,
	"./cy": 191,
	"./cy.js": 191,
	"./da": 192,
	"./da.js": 192,
	"./de": 193,
	"./de-at": 194,
	"./de-at.js": 194,
	"./de-ch": 195,
	"./de-ch.js": 195,
	"./de.js": 193,
	"./dv": 196,
	"./dv.js": 196,
	"./el": 197,
	"./el.js": 197,
	"./en-au": 198,
	"./en-au.js": 198,
	"./en-ca": 199,
	"./en-ca.js": 199,
	"./en-gb": 200,
	"./en-gb.js": 200,
	"./en-ie": 201,
	"./en-ie.js": 201,
	"./en-nz": 202,
	"./en-nz.js": 202,
	"./eo": 203,
	"./eo.js": 203,
	"./es": 204,
	"./es-do": 205,
	"./es-do.js": 205,
	"./es.js": 204,
	"./et": 206,
	"./et.js": 206,
	"./eu": 207,
	"./eu.js": 207,
	"./fa": 208,
	"./fa.js": 208,
	"./fi": 209,
	"./fi.js": 209,
	"./fo": 210,
	"./fo.js": 210,
	"./fr": 211,
	"./fr-ca": 212,
	"./fr-ca.js": 212,
	"./fr-ch": 213,
	"./fr-ch.js": 213,
	"./fr.js": 211,
	"./fy": 214,
	"./fy.js": 214,
	"./gd": 215,
	"./gd.js": 215,
	"./gl": 216,
	"./gl.js": 216,
	"./gom-latn": 217,
	"./gom-latn.js": 217,
	"./he": 218,
	"./he.js": 218,
	"./hi": 219,
	"./hi.js": 219,
	"./hr": 220,
	"./hr.js": 220,
	"./hu": 221,
	"./hu.js": 221,
	"./hy-am": 222,
	"./hy-am.js": 222,
	"./id": 223,
	"./id.js": 223,
	"./is": 224,
	"./is.js": 224,
	"./it": 225,
	"./it.js": 225,
	"./ja": 226,
	"./ja.js": 226,
	"./jv": 227,
	"./jv.js": 227,
	"./ka": 228,
	"./ka.js": 228,
	"./kk": 229,
	"./kk.js": 229,
	"./km": 230,
	"./km.js": 230,
	"./kn": 231,
	"./kn.js": 231,
	"./ko": 232,
	"./ko.js": 232,
	"./ky": 233,
	"./ky.js": 233,
	"./lb": 234,
	"./lb.js": 234,
	"./lo": 235,
	"./lo.js": 235,
	"./lt": 236,
	"./lt.js": 236,
	"./lv": 237,
	"./lv.js": 237,
	"./me": 238,
	"./me.js": 238,
	"./mi": 239,
	"./mi.js": 239,
	"./mk": 240,
	"./mk.js": 240,
	"./ml": 241,
	"./ml.js": 241,
	"./mr": 242,
	"./mr.js": 242,
	"./ms": 243,
	"./ms-my": 244,
	"./ms-my.js": 244,
	"./ms.js": 243,
	"./my": 245,
	"./my.js": 245,
	"./nb": 246,
	"./nb.js": 246,
	"./ne": 247,
	"./ne.js": 247,
	"./nl": 248,
	"./nl-be": 249,
	"./nl-be.js": 249,
	"./nl.js": 248,
	"./nn": 250,
	"./nn.js": 250,
	"./pa-in": 251,
	"./pa-in.js": 251,
	"./pl": 252,
	"./pl.js": 252,
	"./pt": 253,
	"./pt-br": 254,
	"./pt-br.js": 254,
	"./pt.js": 253,
	"./ro": 255,
	"./ro.js": 255,
	"./ru": 256,
	"./ru.js": 256,
	"./sd": 257,
	"./sd.js": 257,
	"./se": 258,
	"./se.js": 258,
	"./si": 259,
	"./si.js": 259,
	"./sk": 260,
	"./sk.js": 260,
	"./sl": 261,
	"./sl.js": 261,
	"./sq": 262,
	"./sq.js": 262,
	"./sr": 263,
	"./sr-cyrl": 264,
	"./sr-cyrl.js": 264,
	"./sr.js": 263,
	"./ss": 265,
	"./ss.js": 265,
	"./sv": 266,
	"./sv.js": 266,
	"./sw": 267,
	"./sw.js": 267,
	"./ta": 268,
	"./ta.js": 268,
	"./te": 269,
	"./te.js": 269,
	"./tet": 270,
	"./tet.js": 270,
	"./th": 271,
	"./th.js": 271,
	"./tl-ph": 272,
	"./tl-ph.js": 272,
	"./tlh": 273,
	"./tlh.js": 273,
	"./tr": 274,
	"./tr.js": 274,
	"./tzl": 275,
	"./tzl.js": 275,
	"./tzm": 276,
	"./tzm-latn": 277,
	"./tzm-latn.js": 277,
	"./tzm.js": 276,
	"./uk": 278,
	"./uk.js": 278,
	"./ur": 279,
	"./ur.js": 279,
	"./uz": 280,
	"./uz-latn": 281,
	"./uz-latn.js": 281,
	"./uz.js": 280,
	"./vi": 282,
	"./vi.js": 282,
	"./x-pseudo": 283,
	"./x-pseudo.js": 283,
	"./yo": 284,
	"./yo.js": 284,
	"./zh-cn": 285,
	"./zh-cn.js": 285,
	"./zh-hk": 286,
	"./zh-hk.js": 286,
	"./zh-tw": 287,
	"./zh-tw.js": 287
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 391;

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return iWeather; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_i18n_i18n__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(333);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var iWeather = (function () {
    function iWeather(platform, statusBar, splashScreen, translate, i18n) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        }).then(function () { return i18n.init(translate); });
    }
    return iWeather;
}());
iWeather = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Projects\iweather\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Projects\iweather\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_5__providers_i18n_i18n__["a" /* I18nProvider */]])
], iWeather);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LocationProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Location; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LocationProvider = (function () {
    function LocationProvider(storage) {
        this.storage = storage;
        this.CURRENT_LOCATION_KEY = "currentLocation";
        this.HISTORICAL_LOCATION = "historicalLocations";
    }
    Object.defineProperty(LocationProvider.prototype, "location", {
        get: function () {
            var _this = this;
            return this.storage.get(this.CURRENT_LOCATION_KEY)
                .then(function (location) {
                if (location) {
                    _this._location = location;
                }
                return location;
            });
        },
        enumerable: true,
        configurable: true
    });
    LocationProvider.prototype.saveCurrentLocation = function (location) {
        this.storage.set(this.CURRENT_LOCATION_KEY, location);
        this._location = location;
    };
    LocationProvider.prototype.addToLocations = function (location) {
        var _this = this;
        return this.getHistoricalLocations()
            .then(function (locations) {
            var indexOfThisLocation = locations
                .map(function (loc) { return loc.city; })
                .indexOf(location.city);
            if (indexOfThisLocation >= 0) {
                locations.splice(indexOfThisLocation, 1);
            }
            locations.unshift(location);
            return _this.storage.set(_this.HISTORICAL_LOCATION, locations);
        });
    };
    LocationProvider.prototype.getHistoricalLocations = function () {
        return this.storage.get(this.HISTORICAL_LOCATION)
            .then(function (locations) { return locations ? locations : []; });
    };
    return LocationProvider;
}());
LocationProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]) === "function" && _a || Object])
], LocationProvider);

var Location = (function () {
    function Location(city, state, country, zmw) {
        this.city = city;
        this.state = state;
        this.country = country;
        this.zmw = zmw;
    }
    return Location;
}());

var _a;
//# sourceMappingURL=location.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherProvider; });
/* unused harmony export Weather */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__location_location__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__i18n_i18n__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__refresher_refresher__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var WeatherProvider = (function () {
    function WeatherProvider(http, locationProvider, i18n, storage, refresher) {
        this.http = http;
        this.locationProvider = locationProvider;
        this.i18n = i18n;
        this.storage = storage;
        this.refresher = refresher;
        this.apiKey = "ac74811bf3cddfee";
        this.CURRENT_WEATHER_KEY = "currentWeather";
        this.basicUrl = this.getBasicURL();
    }
    WeatherProvider.prototype.getBasicURL = function () {
        return "http://api.wunderground.com/api/" + this.apiKey;
    };
    WeatherProvider.prototype.getConditionsURL = function () {
        var currentLanguage = this.i18n.getCurrentLanguage();
        return this.basicUrl + "/conditions/lang:" + currentLanguage.code.toUpperCase() + "/q";
    };
    WeatherProvider.prototype.getWeather = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        return this.checkWeatherInStorage()
            .then(function (weather) {
            if (weather && !refresh)
                return weather;
            else
                return _this.getWeatherFromApi()
                    .then(function (res) { return _this.updateAndGetWeather(_this.getObservationFromResponse(res)); });
        });
    };
    WeatherProvider.prototype.getWeatherFromApi = function () {
        var _this = this;
        return this.locationProvider.location
            .then(function (location) { return _this.getWeatherForLocation(location)
            .then(function (res) { return _this.setLocationIfUnknown(res, location); }); });
    };
    WeatherProvider.prototype.getWeatherForLocation = function (location) {
        return this.http.get(this.getWeatherURL(location)).toPromise();
    };
    WeatherProvider.prototype.setLocationIfUnknown = function (res, location) {
        var currentObservation = this.getObservationFromResponse(res);
        if (!location && currentObservation) {
            this.locationProvider.saveCurrentLocation(currentObservation.display_location);
        }
        return res;
    };
    WeatherProvider.prototype.checkWeatherInStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.storage.get(this.CURRENT_WEATHER_KEY)
                        .then(function (weather) {
                        return _this.checkIfCanUseStoredWeather(weather)
                            .then(function (canUse) { return canUse ? weather : null; });
                    })];
            });
        });
    };
    WeatherProvider.prototype.checkIfCanUseStoredWeather = function (weather) {
        var _this = this;
        return this.refresher.getRefreshTime()
            .then(function (period) { return weather && _this.isUpToDate(weather, period); });
    };
    WeatherProvider.prototype.isUpToDate = function (weather, period) {
        return (new Date().getTime() - weather.timestamp) < period;
    };
    WeatherProvider.prototype.updateAndGetWeather = function (observation) {
        var weather = new Weather(new Date().getTime(), observation);
        this.storage.set(this.CURRENT_WEATHER_KEY, weather);
        return weather;
    };
    WeatherProvider.prototype.getObservationFromResponse = function (res) {
        if (res)
            return res.current_observation;
    };
    WeatherProvider.prototype.getWeatherURL = function (location) {
        if (location) {
            return this.getURLForSelectedLocation(location);
        }
        else {
            return this.getURLForIp();
        }
    };
    WeatherProvider.prototype.getURLForSelectedLocation = function (location) {
        if (location.zmw) {
            return this.getWeatherURLQuery("zmw:" + location.zmw);
        }
        else {
            var area = location.state != null ? location.state : location.country;
            return this.getWeatherURLQuery(area + "/" + location.city);
        }
    };
    WeatherProvider.prototype.getURLForIp = function () {
        return this.getWeatherURLQuery("autoip");
    };
    WeatherProvider.prototype.getWeatherURLQuery = function (query) {
        return this.getConditionsURL() + "/" + query + ".json";
    };
    return WeatherProvider;
}());
WeatherProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */],
        __WEBPACK_IMPORTED_MODULE_3__location_location__["b" /* LocationProvider */],
        __WEBPACK_IMPORTED_MODULE_4__i18n_i18n__["a" /* I18nProvider */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__refresher_refresher__["a" /* RefresherProvider */]])
], WeatherProvider);

var Weather = (function () {
    function Weather(timestamp, observation) {
        this.timestamp = timestamp;
        this.observation = observation;
    }
    return Weather;
}());

//# sourceMappingURL=weather.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return I18nProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_globalization__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__language__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_util_util__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var sysOptions = {
    systemLanguage: __WEBPACK_IMPORTED_MODULE_3__language__["b" /* defaultLanguage */]
};
var I18nProvider = (function () {
    function I18nProvider(globalization) {
        this.globalization = globalization;
    }
    I18nProvider.prototype.init = function (translateService) {
        var _this = this;
        this.translateService = translateService;
        this.translateService.setDefaultLang(__WEBPACK_IMPORTED_MODULE_3__language__["b" /* defaultLanguage */].code);
        if (window.cordova) {
            this.globalization.getPreferredLanguage().then(function (result) {
                _this.changeLanguage(result.value);
            });
        }
        else {
            var browserLanguage = this.translateService.getBrowserLang() || __WEBPACK_IMPORTED_MODULE_3__language__["b" /* defaultLanguage */];
            this.changeLanguage(browserLanguage);
        }
    };
    I18nProvider.prototype.changeLanguage = function (lang) {
        if (typeof lang == 'string') {
            lang = this.getSuitableLanguage(lang);
        }
        this.translateService.use(lang.code);
        sysOptions.systemLanguage = lang;
    };
    I18nProvider.prototype.getSuitableLanguage = function (lang) {
        var language = __WEBPACK_IMPORTED_MODULE_3__language__["a" /* availableLanguages */].find(function (x) { return x.code == lang; });
        return Object(__WEBPACK_IMPORTED_MODULE_4_ionic_angular_util_util__["h" /* isDefined */])(language) ? language : __WEBPACK_IMPORTED_MODULE_3__language__["b" /* defaultLanguage */];
    };
    I18nProvider.prototype.getCurrentLanguage = function () {
        return sysOptions.systemLanguage;
    };
    return I18nProvider;
}());
I18nProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_globalization__["a" /* Globalization */]])
], I18nProvider);

//# sourceMappingURL=i18n.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefresherProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RefresherProvider = (function () {
    function RefresherProvider(storage) {
        this.storage = storage;
        this.REFRESH_PERIOD_KEY = "refreshPeriod";
        this.defaultRefreshPeriod = 1 * 60 * 60 * 1000;
    }
    RefresherProvider.prototype.getRefreshTime = function () {
        var _this = this;
        if (this.refreshTime)
            return Promise.resolve(this.refreshTime);
        else {
            return this.storage.get(this.REFRESH_PERIOD_KEY)
                .then(function (period) { return _this.assignFromStorageOrDefault(period); });
        }
    };
    RefresherProvider.prototype.setRefreshTime = function (periodInMins) {
        this.assignRefreshTime(periodInMins * 60 * 1000);
    };
    RefresherProvider.prototype.assignFromStorageOrDefault = function (period) {
        if (!period) {
            period = this.defaultRefreshPeriod;
        }
        this.assignRefreshTime(period);
        return period;
    };
    RefresherProvider.prototype.assignRefreshTime = function (period) {
        this.refreshTime = period;
        this.storage.set(this.REFRESH_PERIOD_KEY, this.defaultRefreshPeriod);
    };
    return RefresherProvider;
}());
RefresherProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], RefresherProvider);

//# sourceMappingURL=refresher.js.map

/***/ })

},[335]);
//# sourceMappingURL=main.js.map