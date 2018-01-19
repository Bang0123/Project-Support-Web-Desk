import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Message } from '../../models/message';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';

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
    @ViewChild('answerinputs') el: ElementRef;
    constructor(
        private ticketService: TicketService,
        private route: ActivatedRoute,
        private router: Router,
        private dataservice: DataService,
        protected authenticationService: AuthenticationService,
        public snackBar: MatSnackBar
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
        this.ticketService.postMessage(msg).subscribe(result => {
            const resultmsg = result as Message;
            this.messages.push(resultmsg);
            this.ticket.assignee = this.authenticationService.getUser();
            if (this.ticket.status === 'Åben') {
                this.statusChange(this.statuses[1]);
            }
            this.ticket.updatedAt = new Date();
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
        });
    }

    statusChange(status: string) {
        this.ticketService.postStatusChange(this.ticket.id, status)
            .subscribe((result) => {
                this.snackBar.open('Status Changed to ' + status, 'Ok', {
                    duration: 2000,
                });
                this.ticket.updatedAt = new Date();
            });
    }

    statusChangeEvent(event: MatSelectChange) {
        this.ticketService.postStatusChange(this.ticket.id, event.value)
            .subscribe((result) => {
                this.snackBar.open('Status Changed', 'Ok', {
                    duration: 2000,
                });
                this.ticket.updatedAt = new Date();
            });
    }

    prioritiesChangeEvent(event: MatSelectChange) {
        this.ticketService.postPriorityChange(this.ticket.id, event.value)
            .subscribe((result) => {
                this.snackBar.open('Priority Changed', 'Ok', {
                    duration: 2000,
                });
                this.ticket.updatedAt = new Date();
            });
    }

    ShowChoiceError() {
        this.snackBar.open('Vælg enten Intern eller Ekstern', 'Ok', {
            duration: 2500,
        });
    }

    goToLatestsAnswer() {
        this.el.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.el.nativeElement.focus();
    }
}
