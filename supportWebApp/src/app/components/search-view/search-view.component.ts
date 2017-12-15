import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  model: any = {};
  displayedColumns = [
    'status',
    'priority',
    'subject',
    'requester',
    'assignee',
    'updatedAt',
    'gototick'
  ];
  constructor(private ticketService: TicketService,
    private dataservice: DataService) { }

  ngOnInit() {
  }

  search() {
    console.log(this.model);
  }

  getSearchWithParams() {
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
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
