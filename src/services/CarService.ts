import { CarDTO } from '../dtos/CarDTO';
import { api } from './api';

export async function getCars(): Promise<CarDTO[]> {
  try {
    const response = await api.get('/cars');

    const cars: CarDTO[] = response.data;

    return cars;
  } catch (error) {
    throw error;
  }
}
