import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TestModuleModule } from '../../modules/test-module/test-module.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Authuser } from '../../models/authuser';
import { Ticket } from '../../models/ticket';
import { Message } from '../../models/message';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        TestModuleModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render h1 `startside`', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').innerHTML)
      .toEqual('Startside');
  });

  it('should render greeting text `Velkommen Tester`', () => {
    const greeting = 'Velkommen Tester';
    component.user = new Authuser();
    component.user.firstName = 'Tester';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p strong').innerHTML)
      .toEqual(greeting);
  });

  it('should render text for new tickets and display amount', () => {
    component.newTickets = 69;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.row div[name="newticks"] h3').innerHTML)
      .toContain('Nye Tickets');
    expect(compiled.querySelector('div.row div[name="newticks"] p').innerHTML)
      .toEqual('69');
  });

  it('`Acceptance criteria` should render text for assigned user tickets and display amount', () => {
    component.usersTickets = 69;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.row div[name="yourticks"] h3').innerHTML)
      .toContain('Dine Tickets');
    expect(compiled.querySelector('div.row div[name="yourticks"] p').innerHTML)
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
