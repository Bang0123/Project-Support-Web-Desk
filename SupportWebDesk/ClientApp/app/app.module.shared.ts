import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { TicketViewComponent } from "./components/ticketView/ticketView.component";
import { TicketService } from "./services/ticket.service";
import { SingleTicketViewComponent } from "./components/singleTicketView/singleTicketView.component";
import { DataService } from "./services/data.service";



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TicketViewComponent,
    FetchDataComponent,
    SingleTicketViewComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "tickets", component: TicketViewComponent },
      { path: "fetch-data", component: FetchDataComponent },
      { path: "ticket", component: SingleTicketViewComponent },
      { path: "**", redirectTo: "home" }
    ])
  ],
  providers: [TicketService, DataService]
})
export class AppModuleShared {}
