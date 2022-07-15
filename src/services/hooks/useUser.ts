import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function getUsers(): Promise<User[]> {
    const { data } = await api.get('users')

    const users = data.users.map(user => ({ ...user, createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })}))
    return users;
}

export function useUser() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5,
  }) 
}