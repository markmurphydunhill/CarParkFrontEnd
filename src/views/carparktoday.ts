import {inject} from 'aurelia-framework'
import { Parking } from '../services/carpark-types';
import {CarparkService} from "../services/carpark-service";


/*@inject(CarparkService)
export class CurrentParkings {
  currentParkings: Parking[] = [];

  constructor(private  ds:CarparkService){
    this.currentParkings = ds.currentParkings
  }*/

  @inject(CarparkService)
  export class Today {
    currentParkings: Parking[] = [];
    numberOfCars = 0;
    numberOfFreeSpaces = 0;

  constructor(private  ds:CarparkService){
    this.currentParkings = ds.currentParkings;
    this.numberOfCars = ds.numberOfCars;
    this.numberOfFreeSpaces = ds.numberOfFreeSpaces;
  }


}
