import { User } from './user.model';

export interface Comment {
  id: number;
  URL: string;
  URLDestination?: string;
  added: string;
  text: string;
  addedBy?: User;
}
