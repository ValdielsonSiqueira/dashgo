import { createContext, ReactNode } from "react";
import { api2 } from "../services/api";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(creadentials: SignInCredentials) : Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password} : SignInCredentials) {
    console.log('teste');
    
    try {
      const response = await api2.post('sessions', { 
        email, 
        password,
      }); 
      
      console.log('', 'testess');
      
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}