import { CarDTO } from '../dtos/CarDTO';

interface CarDetailsScreenProps {
  car: CarDTO;
}

export type RootStackList = {
  Home: undefined;
  CarDetails: CarDetailsScreenProps;
  Scheduling: undefined;
  SchedulingDetails: undefined;
  SchedulingComplete: undefined;
};
