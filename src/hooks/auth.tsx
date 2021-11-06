import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getAllUsers, saveUser } from '../database/dao/UserDAO';
import { IUserModel } from '../database/model/User';
import { api } from '../services/api';
import { getSession } from '../services/UserService';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { token, user } = await getSession(email, password);

      const userToSave: IUserModel = {
        user_id: user.id,
        name: user.name,
        email: user.email,
        driver_license: user.driver_license,
        avatar: user.avatar,
        token: token,
      };

      await saveUser(userToSave);

      setData({ ...user, user_id: user.id, token });
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const users = await getAllUsers();

      if (users.length > 0) {
        api.defaults.headers.authorization = `Bearer ${users[0].token}`;
        setData(users[0]);
      }
    }

    loadUserData();
  }, []);

  return <AuthContext.Provider value={{ user: data, signIn }}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
