import axios from "axios";
import { parseCookies } from 'nookies';

const cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

export const api2 = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies['dashgo.token']}`
  }
}); 