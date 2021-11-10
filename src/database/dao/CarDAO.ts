import { database } from '..';
import { Car } from '../model/Car';

function getCarCollection() {
  return database.get<Car>('cars');
}
