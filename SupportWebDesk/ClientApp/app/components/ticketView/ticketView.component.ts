import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'ticketView',
    templateUrl: './ticketView.component.html'
})
export class TicketViewComponent {
    public tickets: Ticket[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + '/api/Tickets').subscribe(result => {
            this.tickets = result.json() as Ticket[];
            console.log(result);
        }, error => console.error(error));
    }
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
}

interface Ticket {
    status:string;
    priority:string;
    subject:string;
    requester:User;
    assignee:User;
    createdAt:string;
    updatedAt:string;
} 

interface User {
    userName:string;
}