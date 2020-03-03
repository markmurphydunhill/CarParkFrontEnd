import {inject} from 'aurelia-framework'
 import { Parking } from '../services/carpark-types';
import {CarparkService} from "../services/carpark-service";


@inject(CarparkService)
 export class Parkings {
   pparkings: Parking[] = [];

   constructor(private  ds:CarparkService){
     this.pparkings = ds.pparkings
   }
 }
