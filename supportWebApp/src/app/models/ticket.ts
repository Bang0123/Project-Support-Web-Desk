import { User } from './user';
import { Message } from './message';
export class Ticket {
  id: number;
  status: string;
  priority: string;
  subject: string;
  requester: string;
  assignee: User;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  messages: Message[];
}
