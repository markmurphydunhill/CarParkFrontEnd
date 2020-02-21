//import { inject } from 'aurelia-framework';
import {inject, Aurelia} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { Parking, User } from './carpark-types';
import { HttpClient } from 'aurelia-http-client';
import { PLATFORM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator,  Aurelia, Router)
export class CarparkService {
  parkings : Parking[] = [];
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
   //this.getParkings();
    //this.getUsers();
  }

  async getParkings() {
    const response = await this.httpClient.get('/api/parkings');
    this.parkings = await response.content;
    console.log (this.parkings);
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
    this.parkings.push(newParking);
    //this.total = this.total + amount;
    //console.log('Total so far ' + this.total);
  }

  //signup(firstName: string, lastName: string, email: string, password: string) {}

 /* async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && (user.password === password)) {
      this.changeRouter(PLATFORM.moduleName('app'))
      return true;
    } else {
      return false;
    }
  }*/

  /*async login(email: string, password: string) {
    const response = await this.httpClient.post('/api/users/authenticate', {
      email: email,
      password: password
    });
    const status = await response.content;
    if (status.success) {
      this.httpClient.configure(configuration => {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
      localStorage.parking = JSON.stringify(response.content);
      await this.getParkings();
      //await this.getUsers();
      //await this.getDonations();
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }

  logout() {
    localStorage.parking = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.donation !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.donation);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }*/

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

