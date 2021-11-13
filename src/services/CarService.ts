import { CarDTO } from '../dtos/CarDTO';
import { api } from './api';

export async function getCars() {
  try {
    const response = await api.get('/cars');

    const cars: CarDTO[] = response.data;

    return cars;
  } catch (error) {
    throw error;
  }
}

export async function getCarsSync(lastPulledAt?: number | null) {
  try {
    const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCarUpdate(id: string) {
  try {
    const response = await api.get<CarDTO>(`/cars/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}
