import {inject} from 'aurelia-framework'
 import { Parking } from '../../services/carpark-types';
import {CarparkService} from "../services/carpark-service";


@inject(CarparkService)
 export class Parkings {
   parkings: Parking[] = [];

   constructor(private  ds:CarparkService){
     this.parkings = ds.parkings
   }
 }
