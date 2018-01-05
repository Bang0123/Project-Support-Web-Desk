import { TestBed, inject } from '@angular/core/testing';

import { TicketService } from './ticket.service';
import { TestModuleModule } from '../modules/test-module/test-module.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketService],
      imports: [
        TestModuleModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should be created', inject([TicketService], (service: TicketService) => {
    expect(service).toBeTruthy();
  }));
});
