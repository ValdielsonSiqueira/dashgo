import { createServer, Model } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_date: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },
    routes() {
      this.namespace = 'api';
      this.timing = 750;
      this.get('/user');
      this.post('/user');
      this.namespace = '';
      this.passthrough();
    }
  })
}