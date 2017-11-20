import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class TicketService {
  constructor(
    private http: Http,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getTickets() {
    return this.http.get(this.baseUrl + '/api/tickets');
  }

  getcriticalAmount() {
    return this.http.get(this.baseUrl + '/api/tickets/criticalamount');
  }

  getOpenAmount() {
    return this.http.get(this.baseUrl + '/api/tickets/openamount');
  }
}
