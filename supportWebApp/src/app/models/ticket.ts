import { User } from './user';
export class Ticket {
  id: number;
  status: string;
  priority: string;
  subject: string;
  requester: User;
  assignee: User;
  createdAt: string;
  updatedAt: string;
  body: string;
}
