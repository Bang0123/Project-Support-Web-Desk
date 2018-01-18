import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { TicketViewComponent } from './components/ticket-view/ticket-view.component';
import { SingleTicketViewComponent } from './components/single-ticket-view/single-ticket-view.component';
import { TicketService } from './services/ticket.service';
import { DataService } from './services/data.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { SharedModule } from './modules/shared/shared.module';
// import { OAuthConfig } from './oauth.config';


@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    HomeComponent,
    TicketViewComponent,
    SingleTicketViewComponent,
    LoginPageComponent,
    SearchViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    RouterModule.forRoot([
        { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard]},
      { path: 'login', component: LoginPageComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'tickets', component: TicketViewComponent, canActivate: [AuthGuard] },
      { path: 'ticket', component: SingleTicketViewComponent, canActivate: [AuthGuard] },
      { path: 'search', component: SearchViewComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'home',  canActivate: [AuthGuard]}
    ])
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    TicketService,
    DataService,
    AuthGuard,
    AuthenticationService,
    OAuthService,
    // OAuthConfig,
    // {
    // provide: APP_INITIALIZER,
    // useFactory: initOAuth,
    // deps: [OAuthConfig],
    // multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  // return 'http://localhost:5000';

   return document.getElementsByTagName('base')[0].href;
}
// export function initOAuth(oAuthConfig: OAuthConfig): Function {
//   return () => oAuthConfig.load();
// }
