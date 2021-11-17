import { CarDTO } from './CarDTO';

export interface IGetSchedulesByCarDTO {
  id: string;
  unavailable_dates: string[];
}

export interface IGetSchedulesByUserDTO {
  car: CarDTO;
  start_date: string;
  end_date: string;
  id: number;
}

export interface IAddSchedulesByUserDTO {
  user_id: number;
  car_id: string;
  start_date: Date;
  end_date: Date;
  total: number;
}

export interface IAddScheduleByCarDTO {
  id: string;
  unavailable_dates: string[];
  startDate: string;
  endDate: string;
}
