import { Component } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-display-ticket',
  templateUrl: './display-ticket.component.html',
  styleUrls: ['./display-ticket.component.css']
})
export class DisplayTicketComponent {

  ticketsList: any= [];
  atendiendo: any;
  noAtendido: any;

  constructor(private ticketService: TicketsService){

  }
  ngOnInit(){
    this.ticketService.getTickets().subscribe( response => {
      this.ticketsList = response;
      console.log(this.ticketsList);
    this.atendiendo = this.ticketsList.find((obj: { state: string; }) => obj.state === "Atendiendo");
    this.noAtendido = this.ticketsList.filter((obj: {state: string}) => obj.state === "No Atendido");

    console.log("Los NO atendidos son: ",this.noAtendido);

    if (!this.atendiendo) {
        this.atendiendo = "0"
    }
    })

  }
}
