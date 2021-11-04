import React, { createContext, useState, useContext, ReactNode } from 'react';
import { saveUser } from '../database/dao/UserDAO';
import { IUser } from '../database/model/User';
import { User } from '../dtos/UsersDTO';
import { getSession } from '../services/UserService';

interface AuthState {
  token: string;
  user: User;
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
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { token, user } = await getSession(email, password);

      const userToSave: IUser = {
        user_id: user.id,
        name: user.name,
        email: user.email,
        driver_license: user.driver_license,
        avatar: user.avatar,
        token: token,
      };

      await saveUser(userToSave);

      setData({ token, user });
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>{children}</AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
