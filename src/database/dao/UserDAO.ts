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

async function updateUser(user: IUserModel) {
  try {
    const userCollection = getUserCollection();

    await database.write(async () => {
      const userSelected = await userCollection.find(user.id!);
      await userSelected.update((userData) => {
        let key = '' as keyof IUserModel;

        for (key in user) {
          if (Object.prototype.hasOwnProperty.call(user, key)) {
            userData[key] = user[key]!;
          }
        }
      });
    });

    return;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const userCollection = getUserCollection();

    const users = await userCollection.query().fetch();

    return users;
  } catch (error) {
    throw error;
  }
}

async function deleteUserById(id: string) {
  try {
    const userCollection = getUserCollection();

    await database.write(async () => {
      const userSelected = await userCollection.find(id);
      await userSelected.destroyPermanently();
    });

    return;
  } catch (error) {
    throw error;
  }
}

export { saveUser, getAllUsers, deleteUserById, updateUser };
