import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchdataComponent } from './components/fetchdata/fetchdata.component';
import { TicketViewComponent } from './components/ticket-view/ticket-view.component';
import { SingleTicketViewComponent } from './components/single-ticket-view/single-ticket-view.component';
import { TicketService } from './services/ticket.service';
import { DataService } from './services/data.service';
import { MatModuleModule } from './modules/mat-module/mat-module.module';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    HomeComponent,
    FetchdataComponent,
    TicketViewComponent,
    SingleTicketViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    MatModuleModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'tickets', component: TicketViewComponent },
      { path: 'fetch-data', component: FetchdataComponent },
      { path: 'ticket', component: SingleTicketViewComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    TicketService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getBaseUrl() {
  // return 'http://localhost:57954';

   return document.getElementsByTagName('base')[0].href;
}
