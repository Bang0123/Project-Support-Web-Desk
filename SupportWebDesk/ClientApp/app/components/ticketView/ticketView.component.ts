import { Component} from "@angular/core";
import { TicketService, Ticket, User } from "../../services/ticket.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: "ticketView",
  templateUrl: "./ticketView.component.html",
  styleUrls: ["./ticketView.component.css"]
})
export class TicketViewComponent {
  public tickets: Ticket[];
  public criticalTickets: number;
  public openTickets: number;

  constructor(private ticketService: TicketService, private dataservice:DataService) {
    this.getTickets();
    this.getCriticalAmount();
    this.getOpenAmount();
  }

  getOpenAmount() {
    this.ticketService.getOpenAmount().subscribe(result => {
      this.openTickets = result.json() as number;
    });
  }
  getCriticalAmount() {
    this.ticketService.getcriticalAmount().subscribe(result => {
      this.criticalTickets = result.json() as number;
    });
  }
  getTickets() {
    this.ticketService.getTickets().subscribe(result => {
      this.tickets = result.json() as Ticket[];
    });
  }

  goToTicket(ticket: Ticket) {
    this.dataservice.changeCurrentTicket(ticket);
  }
}