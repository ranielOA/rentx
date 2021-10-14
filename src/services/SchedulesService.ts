import { format } from 'date-fns';
import { CarDTO } from '../dtos/CarDTO';
import {
  IAddScheduleByCarDTO,
  IAddSchedulesByUserDTO,
  IGetSchedulesByCarDTO,
  IGetSchedulesByUserDTO,
} from '../dtos/SchedulesDTO';
import { getPlatformDate } from '../utils/getPlatformDate';
import { api } from './api';

export async function getSchedulesByUser(): Promise<IGetSchedulesByUserDTO[]> {
  try {
    const response = await api.get('schedules_byuser?user_id=1');

    const schedulesByUser: IGetSchedulesByUserDTO[] = response.data;

    return schedulesByUser;
  } catch (error) {
    throw error;
  }
}

export async function getSchedulesByCar(
  id: string
): Promise<IGetSchedulesByCarDTO> {
  try {
    const response = await api.get(`/schedules_bycars/${id}`);

    const schedulesByCar: IGetSchedulesByCarDTO = response.data;

    return schedulesByCar;
  } catch (error) {
    throw error;
  }
}

export async function addScheduleByUser(user_id: number, car: CarDTO) {
  try {
    const scheduleByCar: IAddSchedulesByUserDTO = {
      user_id,
      car,
    };

    await api.post('schedules_byuser', scheduleByCar);

    return;
  } catch (error) {
    throw error;
  }
}

export async function addScheduleByCar(
  id: string,
  unavailable_dates: string[],
  startDate: string,
  endDate: string
) {
  try {
    const scheduleByCar: IAddScheduleByCarDTO = {
      id,
      unavailable_dates,
      startDate: format(getPlatformDate(new Date(startDate)), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    };

    await api.put(`schedules_bycars/${id}`, scheduleByCar);

    return;
  } catch (error) {
    throw error;
  }
}
