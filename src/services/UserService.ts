import { ICreateUsersDTO, IGetSessionUserDTO } from '../dtos/UsersDTO';
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

export async function getSession(email: string, password: string) {
  try {
    const response = await api.post<IGetSessionUserDTO>('/sessions', {
      email,
      password,
    });

    const { token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function sendUsersSync(users: any) {
  try {
    await api.post('/users/sync', users);

    return;
  } catch (error) {
    throw error;
  }
}
