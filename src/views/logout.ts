import { inject } from 'aurelia-framework';
import { CarparkService } from '../services/carpark-service';

@inject(CarparkService)
export class Logout {
  constructor(private ds: CarparkService) {}

  attached() {
    this.ds.logout();
  }
}
