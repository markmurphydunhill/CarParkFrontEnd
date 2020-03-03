import { bindable } from 'aurelia-framework';
import { Parking } from '../../services/carpark-types';
import {inject} from 'aurelia-framework';
import {CarparkService} from "../../services/carpark-service";


@inject (CarparkService)

export class ParkingEvent {
  /*carReg: String;
  status: Boolean;
  carEnterDate: Date;
  carExitDate: Date;*/

 // @bindable
//  parkings: Parking[];



carReg = "";
status = null;
carEnterDate = null;
carExitDate = null;

constructor (private ds: CarparkService){}

addParking(){
  this.ds.newParking(this.carReg, this.status, this.carEnterDate, this.carExitDate)

}
}
