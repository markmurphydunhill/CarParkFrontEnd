import { bindable } from 'aurelia-framework';
import { Parking } from '../../services/carpark-types';

export class ParkingToday {
  @bindable
  currentParkings: Parking[];
}
