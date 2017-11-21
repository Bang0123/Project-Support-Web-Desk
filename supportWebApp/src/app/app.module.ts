import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { IdentityService } from './services/identity.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchdataComponent } from './components/fetchdata/fetchdata.component';
import { TicketViewComponent } from './components/ticket-view/ticket-view.component';
import { SingleTicketViewComponent } from './components/single-ticket-view/single-ticket-view.component';
import { TicketService } from './services/ticket.service';
import { DataService } from './services/data.service';
import { MatModuleModule } from './modules/mat-module/mat-module.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    HomeComponent,
    FetchdataComponent,
    TicketViewComponent,
    SingleTicketViewComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    MatModuleModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'login', component: LoginPageComponent},
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'tickets', component: TicketViewComponent, canActivate: [AuthGuard] },
      { path: 'fetch-data', component: FetchdataComponent, canActivate: [AuthGuard] },
      { path: 'ticket', component: SingleTicketViewComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    TicketService,
    DataService,
    AuthGuard,
    AuthenticationService,
    IdentityService,
    OAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getBaseUrl() {
   return 'http://localhost:57954';

  // return document.getElementsByTagName('base')[0].href;
}
