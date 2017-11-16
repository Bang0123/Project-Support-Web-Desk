import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class TicketService {
  constructor(private http: Http, @Inject("BASE_URL") private baseUrl: string) {}

  getTickets() {
    return this.http.get(this.baseUrl + "/api/Tickets");
  }

  getcriticalAmount() {
    return this.http.get(this.baseUrl + "/api/Tickets/criticalamount");
  }

  getOpenAmount() {
    return this.http.get(this.baseUrl + "/api/Tickets/openamount");
  }
}

export interface Ticket {
  id:number;
  status: string;
  priority: string;
  subject: string;
  requester: User;
  assignee: User;
  createdAt: string;
  updatedAt: string;
  body:string;
}

export interface User {
  userName: string;
  email:string;
}
