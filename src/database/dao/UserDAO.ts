import { database } from '..';
import { IUserModel, User } from '../model/User';

function getUserCollection() {
  return database.get<User>('users');
}

async function saveUser(user: IUserModel) {
  try {
    const userCollection = getUserCollection();

    await database.write(async () => {
      await userCollection.create((newUser) => {
        newUser.user_id = user.user_id;
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.driver_license = user.driver_license;
        newUser.avatar = user.avatar;
        newUser.token = user.token;
      });
    });
  } catch (error) {
    throw error;
  }
}

export { saveUser };
