import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Message } from '../../models/message';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-single-ticket-view',
  templateUrl: './single-ticket-view.component.html',
  styleUrls: ['./single-ticket-view.component.css']
})
export class SingleTicketViewComponent implements OnInit, AfterViewInit {
  public ticket: Ticket;
  body: string;
  isNote: boolean;
  messages: Message[] = [];
  statuses = ['Åben', 'Igang', 'Lukket'];
  priorities = ['Kritisk', 'Høj', 'Normal', 'Lav'];
  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DataService
  ) {
    dataservice.currentTicket.subscribe(ticket => {
      this.ticket = ticket;
      if (this.ticket.messages != null) {
        this.messages = ticket.messages;
      } else {
        ticket.messages = [];
      }
    });
  }
  ngOnInit() { }
  sendAnswer() {
    if (this.isNote == null) {
      this.ShowChoiceError();
      return;
    }
    const msg = new Message();
    msg.body = this.body;
    msg.ticketId = this.ticket.id;
    msg.isNote = this.isNote;
    msg.createdAt = new Date();
    msg.updatedAt = new Date();
    this.ticketService.postMessage(msg).subscribe((result) => {
      this.messages.push(result as Message);
    });
  }
  ngAfterViewInit(): void {
    if (this.ticket.id > 0) {
      this.loadTicketMessages();
    }
  }

  loadTicketMessages() {
    this.ticketService.getTicketMessages(this.ticket.id).subscribe((result) => {
      if (this.messages.length < 1) {
        this.messages = result as Message[];
      } else {
        const newmsgs = result as Message[];
        newmsgs.forEach((msg) => {
          this.messages.push(msg);
        });
      }
      console.log(result);
    });
  }

  ShowChoiceError() {
    console.log('Error choose either intern or ekstern');
  }

  goToLatestsAnswer() {
    console.log('goToLatestsAnswer clicked', this);
  }
}
