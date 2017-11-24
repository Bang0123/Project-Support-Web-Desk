import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthenticationService } from '../../services/authentication.service';

/**
 * Provides signin method to signin & signup components.
 */
export class Signin {
  model: any = {};
  errorMessages: any[] = [];
  private loading = new BehaviorSubject<boolean>(false);
  constructor(
    protected router: Router,
    protected oAuthService: OAuthService,
    protected authenticationService: AuthenticationService) { }

  signin(): void {
    this.loading.next(true);
    this.oAuthService
      .fetchTokenUsingPasswordFlowAndLoadUserProfile(this.model.username, this.model.password)
      .then(() => {
        this.authenticationService.init();

        // Strategy for refresh token through a scheduler.
        this.authenticationService.scheduleRefresh();

        // Gets the redirect URL from authentication service.
        // If no redirect has been set, uses the default.
        const redirect: string = this.authenticationService.redirectUrl
          ? this.authenticationService.redirectUrl
          : '/home';
        // Redirects the user.
        this.loading.next(false);
        this.router.navigate([redirect]);
      }, () => {
        this.errorMessages.push({ description: 'login failed.' });
        this.loading.next(false);
      })
      .catch((error: any) => {
        // Checks for error in response (error from the Token endpoint).
        if (error.body !== '') {
          const body: any = error.json();

          switch (body.error) {
            case 'invalid_grant':
              this.errorMessages.push({ description: 'Invalid email or password.' });
              break;
            default:
              this.errorMessages.push({ description: 'Unexpected error. Try again.' });
          }
        } else {
          const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
          console.log(errMsg);
          this.errorMessages.push({ description: 'Server error. Try later.' });
        }
        this.loading.next(false);
      });
  }

  clearMessages(): void {
    this.errorMessages = [];
  }

  public isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
