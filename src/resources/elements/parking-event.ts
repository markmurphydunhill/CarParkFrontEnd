import { bindable } from 'aurelia-framework';
import { Parking } from '../../services/carpark-types';

export class ParkingEvent {
  carReg: String;
  status: Boolean;
  carEnterDate: Date;
  carExitDate: Date;
  @bindable
  parkings: Parking[];


  addParking() {
    const parking = {
      carReg: this.carReg,
      status: this.status,
      carEnterDate: this.carEnterDate,
      carExitDate: this.carExitDate
    };
    this.parkings.push(parking);
    console.log(parking);
  }
}
