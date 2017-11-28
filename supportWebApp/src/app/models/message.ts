import { User } from './user';

export class Message {
  public body: String;
  public updatedAt: Date;
  public createdAt: Date;
  public author: User;
  public id: number;
  public ticketId: number;
}
