import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from '../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

export const selectorFormats = {
  parse: {
    dateInput: 'll',
  },
  display: {
    dateInput: 'll',
    monthYearLabel: 'MM-YYYY',
    dateA11yLabel: 'll',
    monthYearA11yLabel: 'MM-YYYY',
  },
};

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: selectorFormats },
  ]
})
export class SearchViewComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public model: any = {};
  dateto = new FormControl(moment());
  datefrom = new FormControl(moment());
  displayedColumns = [
    'status',
    'priority',
    'subject',
    'requester',
    'assignee',
    'updatedAt',
    'gototick'
  ];
  priorities = ['Kritisk', 'Høj', 'Normal', 'Lav'];
  constructor(private ticketService: TicketService,
    private dataservice: DataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  search() {
    let params = new HttpParams();
    if (this.model.hasOwnProperty('ticketid')) {
      params = params.append('ticketid', this.model.ticketid);
    }
    if (this.model.hasOwnProperty('requester')) {
      params = params.append('requester', this.model.requester);
    }
    if (this.model.hasOwnProperty('subject')) {
      params = params.append('subject', this.model.subject);
    }
    if (this.model.hasOwnProperty('body')) {
      params = params.append('body', this.model.body);
    }
    if (this.model.hasOwnProperty('priority')) {
      params = params.append('priority', this.model.priority);
    }
    if (this.model.hasOwnProperty('assignee')) {
      params = params.append('assignee', this.model.assignee);
    }
    if (this.model.datefrom != null) {
      if (this.model.datefrom.isAfter(this.model.dateto)) {
        this.snackBar.open('Dato fra skal være før dato til', 'Ok', {
          duration: 5000,
        });
        return;
      }
      params = params.append('datefrom', this.model.datefrom.format('YYYY-MM-DD'));
    }
    if (this.model.dateto != null) {
      if (this.model.dateto.isBefore(this.model.datefrom)) {
        this.snackBar.open('Dato til skal være efter dato fra', 'Ok', {
          duration: 5000,
        });
        return;
      }
      params = params.append('dateto', this.model.dateto.format('YYYY-MM-DD'));
    }
    this.ticketService.searchTickets(params).subscribe(result => {
      this.dataSource.data = result as Ticket[];
    }, error => {
      console.log('Error', error);
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
