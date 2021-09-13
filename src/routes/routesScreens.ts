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

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: CarDetailsScreenProps;
      Scheduling: SchedulingScreenProps;
      SchedulingDetails: SchedulingDetailsScreenProps;
      SchedulingComplete: undefined;
      MyCars: undefined;
    }
  }
}
