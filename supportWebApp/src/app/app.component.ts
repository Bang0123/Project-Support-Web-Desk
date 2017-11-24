import { Component, OnInit } from '@angular/core';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { OAuthService } from 'angular-oauth2-oidc';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private oAuthService: OAuthService,
    private authenticationService: AuthenticationService) {
    // angular-oauth2-oidc configuration.
    this.oAuthService.clientId = 'SupportWebDesk';
    this.oAuthService.scope = 'openid offline_access WebAPI profile roles';
    this.oAuthService.setStorage(this.authenticationService.storage);
    // this.oAuthService.issuer = "http://angularspawebapi.azurewebsites.net";
    this.oAuthService.issuer = 'http://localhost:5000';
    this.oAuthService.oidc = false;
    this.oAuthService.requireHttps = false;

    // const url: string = 'http://angularspawebapi.azurewebsites.net/.well-known/openid-configuration';
    const url = 'http://localhost:5000/.well-known/openid-configuration';

    // Loads Discovery Document.
    this.oAuthService.loadDiscoveryDocument(url);

    if (this.oAuthService.hasValidAccessToken()) {
      this.authenticationService.init();

      // Strategy for refresh token through a scheduler.
      this.authenticationService.startupTokenRefresh();
    }
  }

  ngOnInit() {
  }
}
