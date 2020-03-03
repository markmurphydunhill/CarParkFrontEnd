import { bindable } from 'aurelia-framework';
import { Parking } from '../../services/carpark-types';
import {inject} from 'aurelia-framework';
import {CarparkService} from "../../services/carpark-service";


@inject (CarparkService)

export class ParkingEventExit {


  carReg = "";
  status = null;
  carEnterDate = null;
  carExitDate = null;

  constructor (private ds: CarparkService){}

  addParkingExit(){
    this.ds.exitParking(this.carReg, this.status, this.carEnterDate, this.carExitDate)

  }
}
