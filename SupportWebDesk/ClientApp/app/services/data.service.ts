import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Ticket, User } from "./ticket.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataService {
  public currentTicket:Observable<Ticket>;
  private ticketSource:BehaviorSubject<Ticket>;
  constructor() {
      let tick: Ticket = { id: 0, status: "", priority: "", subject: "", requester: { userName: "", email: "" }, assignee: { userName: "", email: "" }, createdAt: "", updatedAt: "", body: "" };
      this.ticketSource = new BehaviorSubject<Ticket>(tick);
      this.currentTicket = this.ticketSource.asObservable();
    }

  changeCurrentTicket(newtick: Ticket) {
    this.ticketSource.next(newtick);
  }
}