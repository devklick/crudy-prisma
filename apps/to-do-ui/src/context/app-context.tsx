import { UserLoginType } from '@to-do/api-schemas/user-schema';
import { UserSessionDetailType } from '@to-do/api-schemas/user-session-schema';
import userService from '@to-do/services/user-service-fe';
import React, { useState, useEffect, createContext } from 'react';

enum StoredDataType {
  Session = 'SESSION',
  Auth = 'AUTH',
}
type AuthType = {
  authToken: string;
  authExpiry: Date;
};
export type AppContextType = {
  auth: AuthType | null;
  session: UserSessionDetailType | null;
  assumeLoggedIn: () => boolean;
  login: (loginRequest: UserLoginType) => Promise<boolean>;
  logout: () => Promise<void>;
  loadingStoredAuth: boolean;
};
const defaultContextValue: AppContextType = {
  auth: null,
  session: null,
  assumeLoggedIn: () => false,
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve(),
  loadingStoredAuth: true,
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export interface AppContextProviderProps {
  children: React.ReactElement;
}

const getLocalData = <T,>(
  type: StoredDataType,
  setT: React.Dispatch<React.SetStateAction<T>>
) => {
  const localData = localStorage.getItem(type);
  if (localData) {
    setT(JSON.parse(localData) as T);
  }
};
const setLocalData = <T,>(type: StoredDataType, value: T) => {
  if (value) {
    localStorage.setItem(type, JSON.stringify(value));
  } else {
    localStorage.removeItem(type);
  }
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [auth, setAuth] = useState<AuthType | null>(null);
  const [session, setSession] = useState<UserSessionDetailType | null>(null);
  const [loadingStoredAuth, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getLocalData(StoredDataType.Auth, setAuth);
    getLocalData(StoredDataType.Session, setSession);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLocalData(StoredDataType.Auth, auth);
  }, [auth]);

  useEffect(() => {
    setLocalData(StoredDataType.Session, session);
  }, [session]);

  const assumeLoggedIn = () => {
    if (auth === null) {
      return false;
    }
    if (
      auth.authToken !== null &&
      auth.authExpiry !== null &&
      new Date(auth.authExpiry) > new Date()
    ) {
      return true;
    }
    setAuth(null);
    setSession(null);
    return false;
  };
  const login = async (loginRequest: UserLoginType) => {
    await userService
      .login(loginRequest)
      .then((result) => {
        setAuth({ authToken: result.token, authExpiry: result.expiry });
        setSession(result.session);
        return true;
      })
      .catch((error) => {
        console.log(error); // TODO: Do something more appropriate
        return false;
      });
    return false;
  };

  // TODO: Implement this - needs API changes
  const logout = () => Promise.resolve();

  return (
    <AppContext.Provider
      value={{
        auth,
        session,
        login,
        assumeLoggedIn,
        logout,
        loadingStoredAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
