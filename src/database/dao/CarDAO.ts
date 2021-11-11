import { database } from '..';
import { Car } from '../model/Car';

function getCarCollection() {
  return database.get<Car>('cars');
}

async function getAllCars() {
  try {
    const carCollection = getCarCollection();

    const cars = await carCollection.query().fetch();

    return cars;
  } catch (error) {
    throw error;
  }
}

export { getAllCars };
