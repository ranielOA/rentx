import { CarDTO } from './CarDTO';

export interface SchedulesByCarDTO {
  id: string;
  unavailable_dates: string[];
}

export interface SchedulesByUserDTO {
  user_id: number;
  car: CarDTO;
  startDate: string;
  endDate: string;
  id: number;
}
