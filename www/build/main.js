webpackJsonp([1],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_location_location__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_weather_weather__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_refresher_refresher__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(308);
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







/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
    }
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
        var _this = this;
        this.updateRefreshPeriod();
        this.locationProvider.location
            .then(function (location) {
            if (location && _this.locationChanged(location)) {
                _this.changeCurrentLocation(new __WEBPACK_IMPORTED_MODULE_2__providers_location_location__["a" /* Location */](_this.location.city, _this.location.state));
            }
            _this.checkWeatherForLocation(_this.location).then(function (locationCorrect) {
                if (locationCorrect) {
                    _this.goToHomePage();
                }
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
        selector: "page-settings",template:/*ion-inline-start:"C:\Projects\iweather\src\pages\settings\settings.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ "SETTINGS" | translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n        <ion-list>\n          <ion-item>\n            <ion-label fixed>{{ \'CITY\' | translate }}</ion-label>\n            <ion-input [(ngModel)]="location.city" name="city" type="text"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label fixed>{{\'REFRESH_PERIOD\' | translate}} </ion-label>\n            <ion-datetime [displayFormat]="periodFormat" pickerFormat="HH mm" [(ngModel)]="weatherRefreshPeriod"></ion-datetime>\n          </ion-item>\n        </ion-list>\n</ion-content>\n<ion-footer>\n  <button ion-button block id="save-changes" (click)="saveForm()">{{\'SAVE_CHANGES\' | translate}}</button>\n</ion-footer>\n'/*ion-inline-end:"C:\Projects\iweather\src\pages\settings\settings.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_location_location__["b" /* LocationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_location_location__["b" /* LocationProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_weather_weather__["a" /* WeatherProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_weather_weather__["a" /* WeatherProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__providers_refresher_refresher__["a" /* RefresherProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_refresher_refresher__["a" /* RefresherProvider */]) === "function" && _e || Object])
], SettingsPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 125:
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
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/settings/settings.module": [
		307,
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
webpackAsyncContext.id = 166;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefresherProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(50);
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
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _a || Object])
], RefresherProvider);

var _a;
//# sourceMappingURL=refresher.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_weather_weather__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(116);
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

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(234);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_weather_weather__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_location_location__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_i18n_i18n__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_http_loader__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_globalization__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_refresher_refresher__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_time_ago_pipe_index__ = __webpack_require__(306);
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

/***/ 270:
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

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return iWeather; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_i18n_i18n__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(217);
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

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 309,
	"./af.js": 309,
	"./ar": 310,
	"./ar-dz": 311,
	"./ar-dz.js": 311,
	"./ar-kw": 312,
	"./ar-kw.js": 312,
	"./ar-ly": 313,
	"./ar-ly.js": 313,
	"./ar-ma": 314,
	"./ar-ma.js": 314,
	"./ar-sa": 315,
	"./ar-sa.js": 315,
	"./ar-tn": 316,
	"./ar-tn.js": 316,
	"./ar.js": 310,
	"./az": 317,
	"./az.js": 317,
	"./be": 318,
	"./be.js": 318,
	"./bg": 319,
	"./bg.js": 319,
	"./bn": 320,
	"./bn.js": 320,
	"./bo": 321,
	"./bo.js": 321,
	"./br": 322,
	"./br.js": 322,
	"./bs": 323,
	"./bs.js": 323,
	"./ca": 324,
	"./ca.js": 324,
	"./cs": 325,
	"./cs.js": 325,
	"./cv": 326,
	"./cv.js": 326,
	"./cy": 327,
	"./cy.js": 327,
	"./da": 328,
	"./da.js": 328,
	"./de": 329,
	"./de-at": 330,
	"./de-at.js": 330,
	"./de-ch": 331,
	"./de-ch.js": 331,
	"./de.js": 329,
	"./dv": 332,
	"./dv.js": 332,
	"./el": 333,
	"./el.js": 333,
	"./en-au": 334,
	"./en-au.js": 334,
	"./en-ca": 335,
	"./en-ca.js": 335,
	"./en-gb": 336,
	"./en-gb.js": 336,
	"./en-ie": 337,
	"./en-ie.js": 337,
	"./en-nz": 338,
	"./en-nz.js": 338,
	"./eo": 339,
	"./eo.js": 339,
	"./es": 340,
	"./es-do": 341,
	"./es-do.js": 341,
	"./es.js": 340,
	"./et": 342,
	"./et.js": 342,
	"./eu": 343,
	"./eu.js": 343,
	"./fa": 344,
	"./fa.js": 344,
	"./fi": 345,
	"./fi.js": 345,
	"./fo": 346,
	"./fo.js": 346,
	"./fr": 347,
	"./fr-ca": 348,
	"./fr-ca.js": 348,
	"./fr-ch": 349,
	"./fr-ch.js": 349,
	"./fr.js": 347,
	"./fy": 350,
	"./fy.js": 350,
	"./gd": 351,
	"./gd.js": 351,
	"./gl": 352,
	"./gl.js": 352,
	"./gom-latn": 353,
	"./gom-latn.js": 353,
	"./he": 354,
	"./he.js": 354,
	"./hi": 355,
	"./hi.js": 355,
	"./hr": 356,
	"./hr.js": 356,
	"./hu": 357,
	"./hu.js": 357,
	"./hy-am": 358,
	"./hy-am.js": 358,
	"./id": 359,
	"./id.js": 359,
	"./is": 360,
	"./is.js": 360,
	"./it": 361,
	"./it.js": 361,
	"./ja": 362,
	"./ja.js": 362,
	"./jv": 363,
	"./jv.js": 363,
	"./ka": 364,
	"./ka.js": 364,
	"./kk": 365,
	"./kk.js": 365,
	"./km": 366,
	"./km.js": 366,
	"./kn": 367,
	"./kn.js": 367,
	"./ko": 368,
	"./ko.js": 368,
	"./ky": 369,
	"./ky.js": 369,
	"./lb": 370,
	"./lb.js": 370,
	"./lo": 371,
	"./lo.js": 371,
	"./lt": 372,
	"./lt.js": 372,
	"./lv": 373,
	"./lv.js": 373,
	"./me": 374,
	"./me.js": 374,
	"./mi": 375,
	"./mi.js": 375,
	"./mk": 376,
	"./mk.js": 376,
	"./ml": 377,
	"./ml.js": 377,
	"./mr": 378,
	"./mr.js": 378,
	"./ms": 379,
	"./ms-my": 380,
	"./ms-my.js": 380,
	"./ms.js": 379,
	"./my": 381,
	"./my.js": 381,
	"./nb": 382,
	"./nb.js": 382,
	"./ne": 383,
	"./ne.js": 383,
	"./nl": 384,
	"./nl-be": 385,
	"./nl-be.js": 385,
	"./nl.js": 384,
	"./nn": 386,
	"./nn.js": 386,
	"./pa-in": 387,
	"./pa-in.js": 387,
	"./pl": 388,
	"./pl.js": 388,
	"./pt": 389,
	"./pt-br": 390,
	"./pt-br.js": 390,
	"./pt.js": 389,
	"./ro": 391,
	"./ro.js": 391,
	"./ru": 392,
	"./ru.js": 392,
	"./sd": 393,
	"./sd.js": 393,
	"./se": 394,
	"./se.js": 394,
	"./si": 395,
	"./si.js": 395,
	"./sk": 396,
	"./sk.js": 396,
	"./sl": 397,
	"./sl.js": 397,
	"./sq": 398,
	"./sq.js": 398,
	"./sr": 399,
	"./sr-cyrl": 400,
	"./sr-cyrl.js": 400,
	"./sr.js": 399,
	"./ss": 401,
	"./ss.js": 401,
	"./sv": 402,
	"./sv.js": 402,
	"./sw": 403,
	"./sw.js": 403,
	"./ta": 404,
	"./ta.js": 404,
	"./te": 405,
	"./te.js": 405,
	"./tet": 406,
	"./tet.js": 406,
	"./th": 407,
	"./th.js": 407,
	"./tl-ph": 408,
	"./tl-ph.js": 408,
	"./tlh": 409,
	"./tlh.js": 409,
	"./tr": 410,
	"./tr.js": 410,
	"./tzl": 411,
	"./tzl.js": 411,
	"./tzm": 412,
	"./tzm-latn": 413,
	"./tzm-latn.js": 413,
	"./tzm.js": 412,
	"./uk": 414,
	"./uk.js": 414,
	"./ur": 415,
	"./ur.js": 415,
	"./uz": 416,
	"./uz-latn": 417,
	"./uz-latn.js": 417,
	"./uz.js": 416,
	"./vi": 418,
	"./vi.js": 418,
	"./x-pseudo": 419,
	"./x-pseudo.js": 419,
	"./yo": 420,
	"./yo.js": 420,
	"./zh-cn": 421,
	"./zh-cn.js": 421,
	"./zh-hk": 422,
	"./zh-hk.js": 422,
	"./zh-tw": 423,
	"./zh-tw.js": 423
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
webpackContext.id = 425;

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LocationProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Location; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(50);
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
    return LocationProvider;
}());
LocationProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
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

//# sourceMappingURL=location.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherProvider; });
/* unused harmony export Weather */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__location_location__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__i18n_i18n__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__refresher_refresher__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(170);
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
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__location_location__["b" /* LocationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__location_location__["b" /* LocationProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__i18n_i18n__["a" /* I18nProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__i18n_i18n__["a" /* I18nProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__refresher_refresher__["a" /* RefresherProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__refresher_refresher__["a" /* RefresherProvider */]) === "function" && _e || Object])
], WeatherProvider);

var Weather = (function () {
    function Weather(timestamp, observation) {
        this.timestamp = timestamp;
        this.observation = observation;
    }
    return Weather;
}());

var _a, _b, _c, _d, _e;
//# sourceMappingURL=weather.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return I18nProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_globalization__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__language__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_util_util__ = __webpack_require__(2);
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

/***/ })

},[219]);
//# sourceMappingURL=main.js.map