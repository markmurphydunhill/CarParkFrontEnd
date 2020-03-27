import { bindable } from 'aurelia-framework';
import { Parking } from '../../services/carpark-types';
import {CarparkService} from "../../services/carpark-service";
import { inject } from 'aurelia-framework';


@inject (CarparkService)
export class ParkingSpaces {


 // @bindable
  numberOfCars = 0 ;
  numberOfFreeSpaces = 0;

  constructor(private  ds:CarparkService){
    this.numberOfCars = ds.numberOfCars;
    this.numberOfFreeSpaces = ds.numberOfFreeSpaces;
  }
}


