import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { DataService } from '../../services/data.service';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthenticationService } from '../../services/authentication.service';
import { OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { getBaseUrl } from '../../app.module';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    RouterTestingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    TicketService,
    DataService,
    UrlHelperService,
    AuthenticationService,
    OAuthService
  ]
})
export class TestModuleModule {

}
