import { Injectable, Inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message';
import { User } from '../models/user';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class TicketService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private authenticationService: AuthenticationService
  ) { }

  getTickets() {
    const apiUrl = this.baseUrl + 'api/tickets';
    return this.http.get(apiUrl, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  getcriticalAmount() {
    const apiUrl = this.baseUrl + 'api/tickets/criticalamount';
    return this.http.get(apiUrl, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  getOpenAmount() {
    const apiUrl = this.baseUrl + 'api/tickets/openamount';
    return this.http.get(apiUrl, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  getAmountOfNewTickets() {
    const apiUrl = this.baseUrl + 'api/tickets/newamount';
    return this.http.get(apiUrl, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  getAssigneesTickets() {
    const apiUrl = this.baseUrl + 'api/tickets/assignee/';
    return this.http.get(
      apiUrl + this.authenticationService.getUser().userName, {
        headers: this.authenticationService.getAuthorizationHeader()
      });
  }

  getAssigneesTicketsAmount() {
    const apiUrl = this.baseUrl + 'api/tickets/assigneeamount/';
    return this.http.get(
      apiUrl + this.authenticationService.getUser().userName, {
        headers: this.authenticationService.getAuthorizationHeader()
      });
  }

  postMessage(msg: Message) {
    const apiUrl = this.baseUrl + 'api/messages';
    const message = msg;
    const usr = this.authenticationService.getUser();
    message.author = usr.userName;
    message.sender = usr.userName;
    message.senderEmail = '';
    return this.http.post(apiUrl, message, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  getTicketMessages(ticketid: number) {
    const apiUrl = this.baseUrl + 'api/Tickets/messages/' + ticketid;
    return this.http.get(
      apiUrl, {
        headers: this.authenticationService.getAuthorizationHeader()
      });
  }

  searchTickets(searchParams: HttpParams) {
    const apiUrl = this.baseUrl + 'api/Tickets/search';
    return this.http.get(
      apiUrl, {
        headers: this.authenticationService.getAuthorizationHeader(),
        params: searchParams
      });
  }

  postStatusChange(ticketid: number, status: string) {
    const apiUrl = this.baseUrl + 'api/tickets/status';
    const body = {
      TicketId: ticketid,
      Status: status
    };
    return this.http.post(apiUrl, body, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  postPriorityChange(ticketid: number, priority: string) {
    const apiUrl = this.baseUrl + 'api/tickets/priority';
    const body = {
      TicketId: ticketid,
      Priority: priority
    };
    return this.http.post(apiUrl, body, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }
}
