import { CarDTO } from './CarDTO';

export interface IGetSchedulesByCarDTO {
  id: string;
  unavailable_dates: string[];
}

export interface IGetSchedulesByUserDTO {
  user_id: number;
  car: CarDTO;
  startDate: string;
  endDate: string;
  id: number;
}

export interface IAddSchedulesByUserDTO {
  user_id: number;
  car: CarDTO;
}

export interface IAddScheduleByCar {
  id: string;
  unavailable_dates: string[];
  startDate: string;
  endDate: string;
}
