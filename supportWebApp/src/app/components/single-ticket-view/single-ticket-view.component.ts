import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-single-ticket-view',
  templateUrl: './single-ticket-view.component.html',
  styleUrls: ['./single-ticket-view.component.css']
})
export class SingleTicketViewComponent implements OnInit {
  public ticket: Ticket;
  body: string;
  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DataService
  ) {
    dataservice.currentTicket.subscribe(ticket => {
      this.ticket = ticket;
    });
  }
  ngOnInit() { }
  sendAnswer() {
    console.log('sendAnswer clicked', this);
    const msg = new Message();
    msg.body = this.body;
    msg.ticketId = this.ticket.id;
    msg.createdAt = new Date();
    msg.updatedAt = new Date();
    this.ticketService.postMessage(msg).subscribe((result) => {
      console.log('Result obj', result);
      this.ticket.messages.push(result as Message);
    });
  }

  goToLatestsAnswer() {
    console.log('goToLatestsAnswer clicked', this);
  }
}
