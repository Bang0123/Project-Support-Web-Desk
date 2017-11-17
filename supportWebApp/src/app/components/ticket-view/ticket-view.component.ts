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
  public criticalTickets: number;
  public openTickets: number;
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

  constructor(
    private ticketService: TicketService,
    private dataservice: DataService
  ) {
    this.getCriticalAmount();
    this.getOpenAmount();
  }

  getOpenAmount() {
    this.ticketService.getOpenAmount().subscribe(result => {
      this.openTickets = result.json() as number;
    });
  }

  getCriticalAmount() {
    this.ticketService.getcriticalAmount().subscribe(result => {
      this.criticalTickets = result.json() as number;
    });
  }

  getTickets() {
    this.ticketService.getTickets().subscribe(result => {
      this.dataSource.data = result.json() as Ticket[];
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
  ngOnInit() {}
}
