import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable()
export class TicketService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private authenticationService: AuthenticationService
  ) { }

  getTickets() {
    const apiUrl = '/api/tickets';
    return this.http.get(this.baseUrl + apiUrl, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  getcriticalAmount() {
    const apiUrl = '/api/tickets/criticalamount';
    return this.http.get(this.baseUrl + apiUrl, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  getOpenAmount() {
    const apiUrl = '/api/tickets/openamount';
    return this.http.get(this.baseUrl + apiUrl, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  getAmountOfNewTickets() {
    const apiUrl = '/api/tickets/newamount';
    return this.http.get(this.baseUrl + apiUrl, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }

  getAssigneesTickets() {
    const apiUrl = '/api/tickets/assignee/';
    return this.http.get(
      this.baseUrl + apiUrl + this.authenticationService.getUser().userName, {
        headers: this.authenticationService.getAuthorizationHeader()
      });
  }

  getAssigneesTicketsAmount() {
    const apiUrl = '/api/tickets/assigneeamount/';
    return this.http.get(
      this.baseUrl + apiUrl + this.authenticationService.getUser().userName, {
        headers: this.authenticationService.getAuthorizationHeader()
      });
  }

  postMessage(msg: Message) {
    const apiUrl = '/api/messages';
    const message = msg;
    const usr = this.authenticationService.getUser();
    message.author = usr.userName;
    message.sender = usr.userName;
    message.senderEmail = '';
    return this.http.post(this.baseUrl + apiUrl, message, {
      headers: this.authenticationService.getAuthorizationHeader()
    });
  }
}
