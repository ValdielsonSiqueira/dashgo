import { createContext, ReactNode, useEffect, useState } from "react";
import { api2 } from "../services/api";
import Router from 'next/router';
import { setCookie, parseCookies } from 'nookies';

type User =  {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(creadentials: SignInCredentials) : Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'dashgo.token': token } = parseCookies(); 

    if(token) {
      api2.get('/me').then(response => {
        const { email, permissions, roles } = response.data;

        setUser({ email, permissions, roles});
      })
    }
  }, [])

  async function signIn({ email, password} : SignInCredentials) {
    
    try {
      const response = await api2.post('sessions', { 
        email, 
        password,
      }); 

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      
      setUser({
        email, 
        permissions,
        roles
      })
      
      api2.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
      
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}