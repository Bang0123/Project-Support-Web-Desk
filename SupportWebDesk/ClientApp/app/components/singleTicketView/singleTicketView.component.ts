import { Component } from "@angular/core";
import { TicketService, Ticket, User } from "../../services/ticket.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../../services/data.service";

@Component({
  selector: "singleTicket",
  templateUrl: "./singleTicketView.component.html"
})
export class SingleTicketViewComponent {
  public ticket: Ticket;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DataService
  ) {
    if (this.route.snapshot.params["tick"]) {
      dataservice.currentTicket.subscribe(ticket => {
        this.ticket = ticket;
      });
    } else {
      this.getTicket();
    }
  }

  getTicket() {
    this.ticketService.getTickets().subscribe(result => {
      this.ticket = result.json()[0] as Ticket;
    });
  }

  sendAnswer() {
    console.log("sendAnswer clicked", this);
  }

  goToLatestsAnswer() {
    console.log("goToLatestsAnswer clicked", this);
  }
}
