import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Globalization} from "@ionic-native/globalization";
import {TranslateService} from "@ngx-translate/core";
import {availableLanguages, defaultLanguage, Language} from "./language";
import {isDefined} from "ionic-angular/util/util";

const sysOptions = {
  systemLanguage: defaultLanguage
};

@Injectable()
export class I18nProvider {
  private translateService: TranslateService;

  constructor(private globalization: Globalization) {}

  public init(translateService: TranslateService): void {
    this.translateService = translateService;
    this.translateService.setDefaultLang(defaultLanguage.code);

    if ((<any>window).cordova) {
      this.globalization.getPreferredLanguage().then(result => {
        this.changeLanguage(result.value);
      });
    } else {
      let browserLanguage = this.translateService.getBrowserLang() || defaultLanguage;
      this.changeLanguage(browserLanguage);
    }
  }

  private changeLanguage(lang: Language | string): void {
    if (typeof lang == 'string') {
      lang = this.getSuitableLanguage(lang);
    }
    this.translateService.use(lang.code);
    sysOptions.systemLanguage = lang;
  }

  private getSuitableLanguage(lang: string): Language {
    let language = availableLanguages.find(x => x.code == lang);
    return isDefined(language) ? language : defaultLanguage;
  }
}
