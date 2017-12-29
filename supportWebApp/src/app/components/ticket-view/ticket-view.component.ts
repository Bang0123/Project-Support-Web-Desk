import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { User } from '../../models/user';
import { DataService } from '../../services/data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-ticket-view',
    templateUrl: './ticket-view.component.html',
    styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit, AfterViewInit {
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
    public criticalTickets: number;
    public openTickets: number;

    constructor(
        private ticketService: TicketService,
        private dataservice: DataService
    ) {
        this.getCriticalAmount();
        this.getOpenAmount();
    }

    getOpenAmount() {
        this.ticketService.getOpenAmount().subscribe(result => {
            if (result != null) {
                this.openTickets = result as number;
            } else {
                this.openTickets = 0;
            }
        });
    }

    getCriticalAmount() {
        this.ticketService.getcriticalAmount().subscribe(result => {
            if (result != null) {
                this.criticalTickets = result as number;
            } else {
                this.criticalTickets = 0;
            }
        });
    }

    getTickets() {
        this.ticketService.getTickets().subscribe(result => {
            this.dataSource.data = result as Ticket[];
        });
    }

    goToTicket(ticket: Ticket) {
        this.dataservice.changeCurrentTicket(ticket);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.getTickets();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
    ngOnInit() { }
}
