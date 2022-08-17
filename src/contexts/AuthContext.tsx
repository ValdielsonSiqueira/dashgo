import { createContext, ReactNode, useState } from "react";
import { api2 } from "../services/api";
import Router from 'next/router';

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

  async function signIn({ email, password} : SignInCredentials) {
    
    try {
      const response = await api2.post('sessions', { 
        email, 
        password,
      }); 

      const { token, refreshToken, permissions, roles } = response.data;
      
      setUser({
        email, 
        permissions,
        roles
      })

      console.log('email', roles);
      

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