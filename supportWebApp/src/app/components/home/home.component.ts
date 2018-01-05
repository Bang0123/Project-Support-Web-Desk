import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { User } from '../../models/user';
import { DataService } from '../../services/data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Authuser } from '../../models/authuser';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = [
        'status',
        'priority',
        'subject',
        'requester',
        'assignee',
        'updatedAt',
        'gototick'
    ];

    public user: Authuser;
    public newTickets: number;
    public usersTickets: number;
    constructor(private ticketService: TicketService,
        private dataservice: DataService,
        private authenticationService: AuthenticationService) {
        this.user = authenticationService.getUser();
        this.getAmountOfNewTickets();
        this.getAssigneesTicketsAmount();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.getAssigneesTickets();
    }

    getAmountOfNewTickets() {
        this.ticketService.getAmountOfNewTickets().subscribe(result => {
            if (result != null) {
                this.newTickets = result as number;
            } else {
                this.newTickets = 0;
            }
        });
    }

    getAssigneesTicketsAmount() {
        this.ticketService.getAssigneesTicketsAmount().subscribe(result => {
            if (result != null) {
                this.usersTickets = result as number;
            } else {
                this.usersTickets = 0;
            }
        });
    }

    getAssigneesTickets() {
        this.ticketService.getAssigneesTickets().subscribe(result => {
            this.dataSource.data = result as Ticket[];
        });
    }

    goToTicket(ticket: Ticket) {
        this.dataservice.changeCurrentTicket(ticket);
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}
