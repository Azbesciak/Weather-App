import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

@Injectable()
export class RefresherProvider {
  private _refreshTime?: number;
  private REFRESH_PERIOD_KEY = 'refreshPeriod';
  private defaultRefreshPeriod = 1 * 60 * 60 * 1000;
  get refreshTime(): Promise<number> {
    if (this._refreshTime)
      return Promise.resolve(this._refreshTime);
    else {
      return this.storage.get(this.REFRESH_PERIOD_KEY)
        .then(period => this.assignFromStorageOrDefault(period))
    }
  }

  private assignFromStorageOrDefault(period) {
    if (period) {
      this._refreshTime = period;
    } else {
      this._refreshTime = this.defaultRefreshPeriod;
      this.storage.set(this.REFRESH_PERIOD_KEY, this.defaultRefreshPeriod)
    }
    return this._refreshTime;
  }

  public setRefreshTime(periodInMins: number) {
    this._refreshTime = periodInMins * 60 * 1000;
  }

  constructor(private storage: Storage) {
  }

}
