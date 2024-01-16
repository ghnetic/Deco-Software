import { Component } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent {

  name='';
  phone='';
  language= '';
  category='';
  ticketSort: any= [];
  ticketNumber = 0;
  currentDate = new Date();
  currentTime = new Date();

  constructor(private ticketService: TicketsService){
    this.ticketService.getTickets().subscribe(response =>{
      this.ticketSort = response.sort((a, b) => a.ticketNumber - b.ticketNumber);
      this.ticketNumber = this.ticketSort[this.ticketSort.length -1].ticketNumber;
      console.log("El ultimo ticket es: ", this.ticketNumber);
    })
  }

  async addClient(){
    var datos: any;
        datos = {
          'language': this.language,
          'name': this.name,
          'phone': this.phone,
          'category': this.category,
          'date': this.currentDate.toLocaleDateString(),
          'time': this.currentTime.toLocaleTimeString(),
          'attending': false,
          'ticketNumber': this.ticketNumber+1,
          'state': 'No Atendido'
        }
    const response = await this.ticketService.addTicket(datos);
    Swal.fire('¡Bien!','Ticket Añadido','success');
  }
}
