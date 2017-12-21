import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTicketViewComponent } from './single-ticket-view.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestModuleModule } from '../../modules/test-module/test-module.module';
import { Ticket } from '../../models/ticket';
import * as moment from 'moment';

describe('SingleTicketViewComponent', () => {
  let component: SingleTicketViewComponent;
  let fixture: ComponentFixture<SingleTicketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleTicketViewComponent],
      imports: [
        TestModuleModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render h1 `Ticket`', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').innerHTML)
      .toEqual('Ticket');
  });

  it('should render h1 `Ingen ticket valgt` if no ticket in dataservice', () => {
    component.ticket = new Ticket();
    component.ticket.id = -1;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div[name="noticket"] h1').innerHTML)
      .toEqual('Ingen ticket valgt');
    expect(compiled.querySelector('div[name="noticket"]'))
      .toBeTruthy();
    expect(compiled.querySelector('div[name="displayticket"]'))
      .toBeFalsy();
  });

  it('should render a test ticket', () => {
    const date = new Date();
    const tick: Ticket = {
      id: 123,
      status: 'Test',
      priority: 'Test',
      subject: 'Test',
      requester: 'Test',
      assignee: { userName: 'Test', email: 'Test' },
      createdAt: date,
      updatedAt: date,
      body: 'Test',
      messages: [
        {
          body: 'Test',
          updatedAt: date,
          createdAt: date,
          author: 'Test',
          sender: 'Test',
          senderEmail: 'Test',
          id: 1,
          ticketId: 123,
          isNote: true
        },
        {
          body: 'Test',
          updatedAt: date,
          createdAt: date,
          author: 'Test',
          sender: 'Test',
          senderEmail: 'Test',
          id: 2,
          ticketId: 123,
          isNote: false
        }
      ]
    };
    component.ticket = tick;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div[name="displayticket"]'))
      .toBeTruthy();
    expect(compiled.querySelector('div[name="displayticket"] div.row div.col-sm-6 h3').innerHTML)
      .toEqual('Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row div.col-sm-5 p[name="id"]').innerHTML)
      .toEqual('Ticket Id: 123');
    expect(compiled.querySelector('div[name="displayticket"] div.row div.col-sm-5 p[name="status"]').innerHTML)
      .toEqual('Status: Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="header"] div.col-sm-5 p[name="priority"]').innerHTML)
      .toEqual('Prioritet: Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.col-sm-3.small p[name="requester"]').innerHTML)
      .toContain('Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.col-sm-3.small p[name="assignee"]').innerHTML)
      .toContain('Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.col-sm-3.small p[name="created"]').innerHTML)
      .toContain(moment(date).format('HH:mm DD-MM-YYYY'));
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.col-sm-3.small p[name="updated"]').innerHTML)
      .toContain(moment(date).format('HH:mm DD-MM-YYYY'));
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.text.borders.col-md-6 h3').innerHTML)
      .toEqual('Beskrivelse');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.text.borders.col-md-6 p[name="body"]').innerHTML)
      .toEqual('Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.text.borders.col-md-6 div[name="messagedir"]'))
      .toBeTruthy();
    expect(compiled.querySelector(
      'div[name="displayticket"] div.row[name="body"] div.text.borders.col-md-6 div[name="messagedir"] h3'
    ).innerHTML)
      .toEqual('Beskeder og Noter');
    expect(compiled.querySelector(
      'div[name="displayticket"] div.row[name="body"] div.text.borders.col-md-6 div[name="messagedir"] div'
    ))
      .toBeTruthy();
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.row[name="answerinputs"]'))
      .toBeTruthy();
  });

  it('should render a test ticket', () => {
    const date = new Date();
    component.messages = [];
    const tick: Ticket = {
      id: 123,
      status: 'Test',
      priority: 'Test',
      subject: 'Test',
      requester: 'Test',
      assignee: { userName: 'Test', email: 'Test' },
      createdAt: date,
      updatedAt: date,
      body: 'Test',
      messages: []
    };
    component.ticket = tick;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div[name="displayticket"]'))
      .toBeTruthy();
    expect(compiled.querySelector('div[name="displayticket"] div.row div.col-sm-6 h3').innerHTML)
      .toEqual('Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row div.col-sm-5 p[name="id"]').innerHTML)
      .toEqual('Ticket Id: 123');
    expect(compiled.querySelector('div[name="displayticket"] div.row div.col-sm-5 p[name="status"]').innerHTML)
      .toEqual('Status: Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="header"] div.col-sm-5 p[name="priority"]').innerHTML)
      .toEqual('Prioritet: Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.col-sm-3.small p[name="requester"]').innerHTML)
      .toContain('Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.col-sm-3.small p[name="assignee"]').innerHTML)
      .toContain('Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.col-sm-3.small p[name="created"]').innerHTML)
      .toContain(moment(date).format('HH:mm DD-MM-YYYY'));
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.col-sm-3.small p[name="updated"]').innerHTML)
      .toContain(moment(date).format('HH:mm DD-MM-YYYY'));
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.text.borders.col-md-6 h3').innerHTML)
      .toEqual('Beskrivelse');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.text.borders.col-md-6 p[name="body"]').innerHTML)
      .toEqual('Test');
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.text.borders.col-md-6 div[name="messagedir"]'))
      .toBeFalsy();
    expect(compiled.querySelector('div[name="displayticket"] div.row[name="body"] div.row[name="answerinputs"]'))
      .toBeTruthy();
  });
});
