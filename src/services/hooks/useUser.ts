import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  totoalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
    const { data, headers } = await api.get('users', {
      params: {
        page,
      }
    });

    const totoalCount = Number(headers['x-total-count']);

    const users = data.users.map(user => ({ ...user, createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })}))
    return { users, totoalCount};
}

export function useUser(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10
  }) 
}