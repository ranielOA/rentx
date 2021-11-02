export interface ICreateUsersDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

export interface IGetSessionUserDTO {
  token: string;
  user: User;
}
