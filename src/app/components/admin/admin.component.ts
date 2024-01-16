import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import Ticket from 'src/app/interfaces/ticket.interface';
import Swal from 'sweetalert2';
import { TicketAddComponent } from '../ticket-add/ticket-add.component';
import { MatDialog } from '@angular/material/dialog';

let TICKET: Ticket[];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['name', 'school', 'dayOne', 'timeRegisteredOne','participants', 'acciones'];
  dataSource: any;
  closeResult = '';
  coachForm: any;
  idCoach: any;
  AllTickets: any;
  currentTime = new Date();

  constructor(
    private ticketService: TicketsService,
    private router: Router,
    public dialog: MatDialog
    ){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTicket(ticket: Ticket) {
    this.ticketService.getTicket(ticket)
      .subscribe(response => {
        Swal.fire({
          title: 'Información del Cliente',
          html: `
            <div style="text-align: left; font-family: Arial, sans-serif;">
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Nombre:</b> <span style="color: #2c3e50;">${ticket.name}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Número de Ticket:</b> <span style="color: #2c3e50;">${ticket.ticketNumber}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Idioma:</b> <span style="color: #2c3e50;">${ticket.language}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Teléfono:</b> <span style="color: #2c3e50;">${ticket.phone}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Categoria:</b> <span style="color: #2c3e50;">${ticket.category}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Hora Ticket:</b> <span style="color: #2c3e50;">${ticket.time}</span></p>
            </div>
          `,
          showCloseButton: true
        });
      });
  }

  getInfoTicket(){
    this.ticketService.getTicket(this.AllTickets)
    .subscribe(response =>{
      console.log(response);
    })
  }

  changeAttendace(id:string, dayOne:boolean){
    if(!dayOne){
      this.ticketService.updateTicket(id,{'attending': true , 'state': "Atendiendo"})
      .then(response=>{
        console.log(response);
      })
      .catch(error=> console.log(error));
    }else if(dayOne){
      this.ticketService.updateTicket(id,{'attending': false, 'state': "No Atendido" })
      .then(response=>{
        console.log(response);
    })
  }else{
    console.log("Error en cambio de Atendiendo...")
  }
}

  changeState(id:string){

      this.ticketService.updateTicket(id,{'state': 'Atendido', 'timeAttended': this.currentTime.toLocaleTimeString() })
      .then(response=>{
        console.log(response);
      })
      .catch(error=> console.log(error));

  }

  registeredSuccess() {
    Swal.fire({
      title: '¡BIEN!',
      text: 'Hemos registrado el nuevo Ticket',
      icon: 'success'
    });
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(Tickets => {
      TICKET = Tickets.filter(event => event.state === "No Atendido" || event.state === "Atendiendo");
      this.dataSource = new MatTableDataSource(TICKET);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TicketAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  deletTicket(ticket: Ticket) {
    Swal.fire({
      title: '¿Estás segura?',
      text: "¡No podrás deshacer los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketService.deleteTicket(ticket);
        Swal.fire(
          '¡Eliminado!',
          'Has eliminado a este coach',
          'success'
        );
      }
    });
  }


}
