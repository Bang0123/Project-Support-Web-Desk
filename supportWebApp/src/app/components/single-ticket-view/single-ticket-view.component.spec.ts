import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTicketViewComponent } from './single-ticket-view.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestModuleModule } from '../../modules/test-module/test-module.module';

describe('SingleTicketViewComponent', () => {
  let component: SingleTicketViewComponent;
  let fixture: ComponentFixture<SingleTicketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTicketViewComponent ],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
