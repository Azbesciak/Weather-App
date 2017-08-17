webpackJsonp([1],{

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_location_location__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_weather_weather__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(91);
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
    function SettingsPage(navCtrl, navParams, locationProvider, weather, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.locationProvider = locationProvider;
        this.weather = weather;
        this.alertCtrl = alertCtrl;
        this.selectionResult = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.selectionWatcher = this.selectionResult.subscribe(function (location) { return _this.onLocationChanged(location); });
        this.location = new __WEBPACK_IMPORTED_MODULE_2__providers_location_location__["a" /* Location */]();
        this.locationProvider.location
            .then(function (location) {
            if (location)
                _this.location = location;
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
        this.locationProvider.location.then(function (location) {
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
    SettingsPage.prototype.locationChanged = function (location) {
        return (location.city != this.location.city || location.state != this.location.state);
    };
    SettingsPage.prototype.goToHomePage = function () {
        var _this = this;
        this.navCtrl.insert(0, __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */])
            .then(function () { return _this.navCtrl.pop(); })
            .then(function () { return _this.navCtrl.parent.select(0); });
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
            handler: function (location) {
                _this.selectLocation(location);
            }
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "page-settings",template:/*ion-inline-start:"C:\Projects\iweather\src\pages\settings\settings.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ "SETTINGS" | translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col width-150>\n        <ion-list>\n          <form (ngSubmit)="saveForm()">\n            <ion-item>\n              <ion-label fixed>\n                {{ \'CITY\' | translate }}\n              </ion-label>\n              <ion-input [(ngModel)]="location.city" name="city" type="text"></ion-input>\n            </ion-item>\n            <button ion-button block>{{\'SAVE_CHANGES\' | translate}}</button>\n          </form>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Projects\iweather\src\pages\settings\settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_location_location__["b" /* LocationProvider */],
        __WEBPACK_IMPORTED_MODULE_3__providers_weather_weather__["a" /* WeatherProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 126:
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
webpackEmptyAsyncContext.id = 126;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/settings/settings.module": [
		308,
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
webpackAsyncContext.id = 167;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefresherProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(44);
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
        this.REFRESH_PERIOD_KEY = 'refreshPeriod';
        this.defaultRefreshPeriod = 1 * 60 * 60 * 1000;
    }
    Object.defineProperty(RefresherProvider.prototype, "refreshTime", {
        get: function () {
            var _this = this;
            if (this._refreshTime)
                return Promise.resolve(this._refreshTime);
            else {
                return this.storage.get(this.REFRESH_PERIOD_KEY)
                    .then(function (period) { return _this.assignFromStorageOrDefault(period); });
            }
        },
        enumerable: true,
        configurable: true
    });
    RefresherProvider.prototype.assignFromStorageOrDefault = function (period) {
        if (period) {
            this._refreshTime = period;
        }
        else {
            this._refreshTime = this.defaultRefreshPeriod;
            this.storage.set(this.REFRESH_PERIOD_KEY, this.defaultRefreshPeriod);
        }
        return this._refreshTime;
    };
    RefresherProvider.prototype.setRefreshTime = function (periodInMins) {
        this._refreshTime = periodInMins * 60 * 1000;
    };
    return RefresherProvider;
}());
RefresherProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], RefresherProvider);

//# sourceMappingURL=refresher.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Projects\iweather\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Settings" tabIcon="cog"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\Projects\iweather\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-about',template:/*ion-inline-start:"C:\Projects\iweather\src\pages\about\about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col width-100>\n        <ion-list>\n        <ion-item>\n          <strong>{{"APP_NAME" | translate}}: </strong> iWeather\n        </ion-item>\n          <ion-item>\n            <strong>{{"VERSION" | translate}}: </strong> 1.0.0\n          </ion-item>\n          <ion-item>\n            <strong>{{"APP_DESC_LABEL" | translate}}: </strong> {{"APP_DESC" | translate}}\n          </ion-item>\n\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Projects\iweather\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(235);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_weather_weather__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_location_location__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_i18n_i18n__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ngx_translate_http_loader__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_common_http__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_globalization__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_refresher_refresher__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_15__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* iWeather */],
            __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* iWeather */], {}, {
                links: [
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["a" /* HttpClient */]]
                }
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* iWeather */],
            __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_globalization__["a" /* Globalization */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_10__providers_weather_weather__["a" /* WeatherProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_location_location__["b" /* LocationProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_i18n_i18n__["a" /* I18nProvider */],
            __WEBPACK_IMPORTED_MODULE_19__providers_refresher_refresher__["a" /* RefresherProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
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

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return iWeather; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_i18n_i18n__ = __webpack_require__(88);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        }).then(function () { return i18n.init(translate); });
    }
    return iWeather;
}());
iWeather = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Projects\iweather\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Projects\iweather\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_6__providers_i18n_i18n__["a" /* I18nProvider */]])
], iWeather);

//# sourceMappingURL=app.component.js.map

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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__location_location__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__i18n_i18n__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__refresher_refresher__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
        return this.http.get(this.getWeatherURL(location))
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    WeatherProvider.prototype.setLocationIfUnknown = function (res, location) {
        var currentObservation = this.getObservationFromResponse(res);
        if (!location && currentObservation) {
            this.locationProvider.saveCurrentLocation(currentObservation.display_location);
        }
        return res;
    };
    WeatherProvider.prototype.checkWeatherInStorage = function () {
        var _this = this;
        return this.storage.get(this.CURRENT_WEATHER_KEY).then(function (weather) {
            if (_this.canUseStoredWeather(weather)) {
                return weather;
            }
            else {
                return null;
            }
        });
    };
    WeatherProvider.prototype.canUseStoredWeather = function (weather) {
        var _this = this;
        return this.refresher.refreshTime
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Http */],
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

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return I18nProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_globalization__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__language__ = __webpack_require__(271);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_globalization__["a" /* Globalization */]])
], I18nProvider);

//# sourceMappingURL=i18n.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_weather_weather__ = __webpack_require__(87);
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
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.getWeather();
    };
    HomePage.prototype.getWeather = function (isRefresh) {
        var _this = this;
        if (isRefresh === void 0) { isRefresh = false; }
        this.weatherProvider
            .getWeather(isRefresh)
            .then(function (weather) {
            _this.weather = weather.observation;
            _this.recetUpdate = weather.timestamp;
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Projects\iweather\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{"HOME" | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="home">\n  <ion-badge float-right *ngIf="recetUpdate" (click)="getWeather(true)">\n    <ion-icon name="time"></ion-icon>\n    {{recetUpdate | date: \'HH:mm\'}}\n  </ion-badge>\n  <ion-grid *ngIf="weather">\n    <ion-row>\n      <ion-col width-50 offset-25>\n        <h2 class="location">{{weather.display_location.city}}, {{weather.display_location.state}}</h2>\n        <div class="icon"><img src="{{weather.icon_url}}"></div>\n        <h3 class="desc">{{weather.weather}}</h3>\n        <h1 class="temp">{{weather.temp_c}}&deg;C</h1>\n      </ion-col>\n    </ion-row>\n    <ion-col width-100>\n      <ion-list>\n        <ion-item>\n          <strong>{{"TEMP" | translate}}: </strong> {{weather.temperature_string}}\n        </ion-item>\n\n        <ion-item>\n          <strong>{{"REL_HUM" | translate}}: </strong> {{weather.relative_humidity}}\n        </ion-item>\n\n        <ion-item>\n          <strong>{{"DEWPOINT" | translate}}: </strong> {{weather.dewpoint_string}}\n        </ion-item>\n\n        <ion-item>\n          <strong>{{"VISIBILITY" | translate}}: </strong> {{weather.visibility_km}}\n        </ion-item>\n        <ion-item>\n          <strong>{{"HEAT_INDEX" | translate}}: </strong> {{weather.heat_index_string}}\n        </ion-item>\n      </ion-list>\n    </ion-col>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Projects\iweather\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_weather_weather__["a" /* WeatherProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[220]);
//# sourceMappingURL=main.js.map