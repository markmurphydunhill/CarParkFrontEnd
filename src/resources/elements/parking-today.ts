import { bindable } from 'aurelia-framework';
import { Parking } from '../../services/carpark-types';
import {CarparkService} from "../../services/carpark-service";


export class ParkingToday {
  @bindable
  currentParkings: Parking[];
}
