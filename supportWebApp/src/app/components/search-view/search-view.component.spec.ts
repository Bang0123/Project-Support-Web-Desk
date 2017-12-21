import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViewComponent } from './search-view.component';
import { TestModuleModule } from '../../modules/test-module/test-module.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Message } from '../../models/message';
import { Ticket } from '../../models/ticket';

describe('SearchViewComponent', () => {
  let component: SearchViewComponent;
  let fixture: ComponentFixture<SearchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchViewComponent ],
      imports: [
        TestModuleModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render h1 `Søg efter tickets`', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').innerHTML)
      .toEqual('Søg efter tickets');
  });

  it('should render search form', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('form'))
      .toBeTruthy();
  });

  it('should not render error messages', () => {
    component.errorMessages = [];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.alert.alert-danger.alert-dismissable.has-error'))
      .toBeFalsy();
  });

  it('should render error messages', () => {
    component.errorMessages = [{ description: 'Test' }];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.alert.alert-danger.alert-dismissable.has-error div p strong').innerHTML)
      .toEqual('Test');
  });

  it('should render text for loading', () => {
    component.dataSource.data = [];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p[name="loading"] em').innerHTML)
      .toEqual('Søg efter tickets');
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
      messages: []
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
