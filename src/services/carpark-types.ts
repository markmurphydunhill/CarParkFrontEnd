export interface Parking {
  carReg: String;
  status: Boolean;
  carEnterDate: Date;
  carExitDate: Date;
  _id: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}
