import { Component, OnInit, Inject } from '@angular/core';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private oAuthService: OAuthService,
        @Inject('BASE_URL') private baseUrl: string,
        private authenticationService: AuthenticationService,
        public title: Title
    ) {
        title.setTitle('Support Web Desk');
        // angular-oauth2-oidc configuration.
        this.oAuthService.clientId = 'SupportWebDesk';
        this.oAuthService.scope = 'openid offline_access WebAPI profile roles';
        this.oAuthService.setStorage(this.authenticationService.storage);
        this.oAuthService.issuer = this.baseUrl;
        this.oAuthService.oidc = false;
        this.oAuthService.requireHttps = false;

        // Loads Discovery Document.
        const url = this.baseUrl + '/.well-known/openid-configuration';
        this.loadDiscovery(url);
        this.initServices();
    }

    loadDiscovery(url: string) {
        return this.oAuthService.loadDiscoveryDocument(url).catch(() => {
            setTimeout(() => {
                this.loadDiscovery(url);
            }, 8000);
        });
    }

    initServices() {
        if (this.oAuthService.hasValidAccessToken()) {
            this.authenticationService.init();

            // Strategy for refresh token through a scheduler.
            this.authenticationService.startupTokenRefresh();
        }
    }

    ngOnInit() {
    }
}
