import { bindable } from 'aurelia-framework';
import { Parking } from '../../services/carpark-types';

export class ParkingList {
  @bindable
  parkings: Parking[];
}
