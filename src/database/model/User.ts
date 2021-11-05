import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

interface IUserModel {
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

class User extends Model {
  static table = 'users';

  @field('user_id')
  user_id!: string;

  @field('name')
  name!: string;

  @field('email')
  email!: string;

  @field('driver_license')
  driver_license!: string;

  @field('avatar')
  avatar!: string;

  @field('token')
  token!: string;
}

export { User, IUserModel };
