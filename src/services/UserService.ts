import { ICreateUsersDTO } from '../dtos/UsersDTO';
import { api } from './api';

export async function createUser(
  name: string,
  email: string,
  driverLicense: string,
  password: string
) {
  try {
    const user: ICreateUsersDTO = {
      name: name,
      email: email,
      driver_license: driverLicense,
      password,
    };

    await api.post('/users', user);

    return;
  } catch (error) {
    throw error;
  }
}
