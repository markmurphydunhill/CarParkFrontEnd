import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'currentParkinglist'],
        name: 'Current Parking List',
        moduleId: PLATFORM.moduleName('views/carparktoday'),
        nav: true,
        title: 'Current Parking List'
      },
      {
        route: ['parkinglist'],
        name: 'Parking List',
        moduleId: PLATFORM.moduleName('views/carpark'),
        nav: true,
        title: 'Parking List'
      },
      {
        route: 'report',
        name: 'Report',
        moduleId: PLATFORM.moduleName('views/report'),
        nav: true,
        title: 'Parking Report'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      }
    ]);
    this.router = router;
  }
}
