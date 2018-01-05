import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketViewComponent } from './ticket-view.component';
import { TestModuleModule } from '../../modules/test-module/test-module.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { Authuser } from '../../models/authuser';
import { Message } from '../../models/message';

describe('TicketViewComponent', () => {
  let component: TicketViewComponent;
  let fixture: ComponentFixture<TicketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketViewComponent ],
      imports: [
        TestModuleModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render h1 `Se Alle Tickets`', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').innerHTML)
      .toEqual('Se Alle Tickets');
  });

  it('should render text for open tickets and display amount', () => {
    component.openTickets = 69;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.row div[name="openticks"] h3').innerHTML)
      .toContain('Åbne tickets Lige nu');
    expect(compiled.querySelector('div.row div[name="openticks"] p').innerHTML)
      .toEqual('69');
  });

  it('should render text for critical tickets and display amount', () => {
    component.criticalTickets = 69;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.row div[name="criticalticks"] h3').innerHTML)
      .toContain('Kritiske tickets');
    expect(compiled.querySelector('div.row div[name="criticalticks"] p').innerHTML)
      .toEqual('69');
  });

  it('should render text for loading', () => {
    component.dataSource.data = [];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p[name="loading"] em').innerHTML)
      .toEqual('Loading...');
  });

  it('should render one row in datatable', () => {
    const tick: Ticket = {
      id: 123,
      status: 'Test',
      priority: 'Test',
      subject: 'Test',
      requester: 'Test',
      assignee: { userName: 'Test', email: 'Test' },
      createdAt: new Date(),
      updatedAt: new Date(),
      body: 'Test',
      messages: [
        new Message()
      ]
    };
    component.dataSource.data = [tick];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(component.dataSource.data.length)
      .toEqual(1);
    const selector = 'div div.example-container.mat-elevation-z8 mat-table mat-row mat-cell.mat-cell.cdk-column-subject.mat-column-subject';
    expect(compiled.querySelector(selector).innerHTML)
      .toContain('Test');
  });
});
