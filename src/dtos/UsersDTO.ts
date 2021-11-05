export interface ICreateUsersDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

export interface IUserDTO {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

export interface IGetSessionUserDTO {
  token: string;
  user: IUserDTO;
}
