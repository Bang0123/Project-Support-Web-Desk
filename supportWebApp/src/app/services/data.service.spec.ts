import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { TestModuleModule } from '../modules/test-module/test-module.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ticket } from '../models/ticket';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [
        TestModuleModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should contain property currentTicket', inject([DataService], (service: DataService) => {
    expect(service.currentTicket).toBeDefined();
  }));
});
