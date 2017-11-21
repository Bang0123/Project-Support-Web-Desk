import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class IdentityService {
  public users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  /**
   * Gets all users.
   */
  public getAll(): void {
    // Sends an authenticated request.
    this.http
      .get(this.baseUrl + '/api/identity/GetAll', {
        headers: this.authenticationService.getAuthorizationHeader()
      })
      .subscribe((data: any) => {
        this.users.next(data);
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log('An error occurred:', error.error.message);
        } else {
          console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
      });
  }

  /**
   * Creates a new user.
   * @param model User's data
   * @return An IdentityResult
   */
  public create(model: any): Observable<any> {
    const body: string = JSON.stringify(model);

    // Sends an authenticated request.
    return this.http.post(this.baseUrl + '/api/identity/Create', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      map((response: Response) => {
        return response;
      }),
      catchError((error: any) => {
        return _throw(error);
      }));
  }

  /**
   * Deletes a user.
   * @param username Username of the user
   * @return An IdentityResult
   */
  public delete(username: string): void {
    const body: string = JSON.stringify(username);

    // Sends an authenticated request.
    this.http
      .post(this.baseUrl + '/api/identity/Delete', body, {
        headers: this.authenticationService.getAuthorizationHeader()
      })
      .subscribe(() => {
        // Refreshes the users.
        this.getAll();
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log('An error occurred:', error.error.message);
        } else {
          console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
      });
  }

  // Add other methods.

}
