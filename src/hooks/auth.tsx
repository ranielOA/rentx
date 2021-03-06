import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { deleteUserById, getAllUsers, saveUser, updateUser } from '../database/dao/UserDAO';
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
  signOut: () => Promise<void>;
  updatedUser: (user: User) => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { token, user } = await getSession(email, password);

      await saveUser({
        user_id: user.id,
        name: user.name,
        email: user.email,
        driver_license: user.driver_license,
        avatar: user.avatar,
        token: token,
      });

      setData({ ...user, user_id: user.id, token });
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      await deleteUserById(data.id);

      setData({} as User);
    } catch (error) {
      throw error;
    }
  }

  async function updatedUser(user: User) {
    try {
      await updateUser(user);
      setData(user);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const users = await getAllUsers();

        if (users.length > 0) {
          api.defaults.headers.authorization = `Bearer ${users[0].token}`;
          setData(users[0]);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updatedUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
