import { User } from './user';
import { Message } from './message';
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
  messages: Message[];
}
