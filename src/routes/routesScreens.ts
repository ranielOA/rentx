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

export interface SignUpSecondStepScreenProps {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export interface ConfirmationScreen {
  title: string;
  message: string;
  nextScreenRoute: keyof RootParamListScreens;
}

export interface RootParamListScreens {
  Home: undefined;
  CarDetails: CarDetailsScreenProps;
  Scheduling: SchedulingScreenProps;
  SchedulingDetails: SchedulingDetailsScreenProps;
  Confirmation: ConfirmationScreen;
  MyCars: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: SignUpSecondStepScreenProps;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamListScreens {}
  }
}
