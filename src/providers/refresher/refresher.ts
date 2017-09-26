import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Storage } from "@ionic/storage";

@Injectable()
export class RefresherProvider {
  private refreshTime?: number;
  private REFRESH_PERIOD_KEY = "refreshPeriod";
  private defaultRefreshPeriod = 1 * 60 * 60 * 1000;

  getRefreshTime(): Promise<number> {
    if (this.refreshTime)
      return Promise.resolve(this.refreshTime);
    else {
      return this.storage.get(this.REFRESH_PERIOD_KEY)
        .then(period => this.assignFromStorageOrDefault(period))
    }
  }

  setRefreshTime(periodInMins: number) {
    this.assignRefreshTime(periodInMins * 60 * 1000);
  }

  private assignFromStorageOrDefault(period: number) {
    if (!period) {
      period = this.defaultRefreshPeriod;
    }
    this.assignRefreshTime(period);
    return period;
  }

  private assignRefreshTime(period: number) {
    this.refreshTime = period;
    this.storage.set(this.REFRESH_PERIOD_KEY, this.defaultRefreshPeriod);
  }


  constructor(private storage: Storage) {
  }

}
