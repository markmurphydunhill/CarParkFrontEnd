//import { inject } from 'aurelia-framework';
import {inject, Aurelia} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { Parking, User } from './carpark-types';
import { HttpClient } from 'aurelia-http-client';
import { PLATFORM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator,  Aurelia, Router)
export class CarparkService {
  pparkings : Parking[] = [];
  currentParkings: Parking[] = [];
  numberOfSpaces = 100;
  numberOfCars =0;
  numberOfFreeSpaces = 0;
  //users: Map<string, User> = new Map();



  constructor(
    private httpClient: HttpClient,
    private ea:EventAggregator,
    private au: Aurelia,
    private router: Router)

  {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3001');
    });

  }

  async getParkings() {
    const response = await this.httpClient.get('/api/parkings');
    this.pparkings = await response.content;
    console.log (this.pparkings);
  }

  async getCurrentParkings() {
    const response = await this.httpClient.get('/api/parkingPresent');
    this.currentParkings = await response.content;
    console.log (this.currentParkings);
  }

  async getNumberOfCars() {
    const response = await this.httpClient.get('/api/parkingTotal');
    this.numberOfCars = await response.content;
    this.numberOfFreeSpaces = (this.numberOfSpaces - this.numberOfCars);
    console.log (this.numberOfCars);
  }

  /*async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
    });
  }*/

  async newParking(carReg: String, status: boolean, carEnterDate:  Date, carExitDate: Date) {
    const parking = {
      carReg: carReg,
      status: status,
      carEnterDate:   carEnterDate,
      carExitDate:  carExitDate
    };
    const response = await this.httpClient.post('/api/carEntry', parking);
    const newParking = await response.content;
    //this.candidates.push(newCandidate);
    this.pparkings.push(newParking);
    this.currentParkings.push(newParking);
    this.numberOfCars ++;
    this.numberOfFreeSpaces --;

  }

  async exitParking(carReg: String, status: boolean, carEnterDate:  Date, carExitDate: Date) {
    const parking = {
      carReg: carReg,
      status: status,
      carEnterDate:   carEnterDate,
      carExitDate:  carExitDate
    };
    const response = await this.httpClient.post('/api/carExit', parking);
    const newParking = await response.content;
    const newParkingId = newParking._id;

    //const car = await this.parkings.findOne({_id: newParkingId});
    //const car = await this.pparkings.findOne({_id: newParkingId});
    //const user = this.users.get(email);
   // const car = this.parkings.get(newParking._id);

   // car.carExitDate = newParking.carExitDate;
   // car.status = newParking.status;
    //console.log(car);
   // await car.save();

    //this.parkings.push(newParking);

  }

  //signup(firstName: string, lastName: string, email: string, password: string) {}


  async login(email: string, password: string) {
    const response = await this.httpClient.post('/api/users/authenticate', {
      email: email,
      password: password
    });
    const status = await response.content;
    if (status.success) {
      this.httpClient.configure(configuration => {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
      localStorage.donation = JSON.stringify(response.content);
      await this.getParkings();
      await this.getCurrentParkings();
      await this.getNumberOfCars();
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.donation = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.parking !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.parking);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}

