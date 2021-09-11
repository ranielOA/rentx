import { CarDTO } from '../dtos/CarDTO';

export interface CarDetailsScreenProps {
  car: CarDTO;
}

export interface SchedulingScreenProps {
  car: CarDTO;
}

export interface SchedulingDetailsScreenProps {
  car: CarDTO;
  dates: string[];
}

export type RootStackList = {
  Home: undefined;
  CarDetails: CarDetailsScreenProps;
  Scheduling: SchedulingScreenProps;
  SchedulingDetails: SchedulingDetailsScreenProps;
  SchedulingComplete: undefined;
};
