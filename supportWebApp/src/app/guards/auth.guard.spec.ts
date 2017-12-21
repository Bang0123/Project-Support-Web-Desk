import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../services/authentication.service';
import { TestModuleModule } from '../modules/test-module/test-module.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// describe('AuthGuard', () => {
//   beforeEach(() => {
//     let loggedInGuard: AuthGuard;
//     let storageService: AuthenticationService;
//     let router = {
//       navigate: jasmine.createSpy('navigate')
//     };
//     let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>("RouterStateSnapshot", ['toString']);

//     TestBed.configureTestingModule({
//       providers: [
//         AuthGuard,
//         { provide: Router, useValue: router },
//         AuthGuard,
//         AuthenticationService
//       ],
//       imports: [
//         TestModuleModule
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     });
//   });

//   it('should create and be injectable', inject([AuthGuard], (guard: AuthGuard) => {
//     expect(guard).toBeTruthy();
//   }));
// });
