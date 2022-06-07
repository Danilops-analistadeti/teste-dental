import { Person } from './person.interface';

export interface User {
  email: string;
  active?: boolean;
  person: Person;
  id?: string;
  isAdmin?: boolean;
}
