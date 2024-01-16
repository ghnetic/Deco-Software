import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Client from 'src/app/interfaces/clients.interface';
import { ClientService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';
import { ClientsAddComponent } from '../clients-add/clients-add.component';
let CLIENTS: Client[];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'email', 'acciones'];
  dataSource: any;
  closeResult = '';
  coachForm: any;
  idCoach: any;
  AllClients: any;



  constructor(
    private clientService: ClientService,
    private router: Router,
    public dialog: MatDialog
    ){}

    openDialog() {
      const dialogRef = this.dialog.open(ClientsAddComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  getClient(client: Client) {
    this.clientService.getClient(client)
      .subscribe(response => {
        Swal.fire({
          title: 'Información del Cliente',
          html: `
            <div style="text-align: left; font-family: Arial, sans-serif;">
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Nombre:</b> <span style="color: #2c3e50;">${client.name}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Teléfono:</b> <span style="color: #2c3e50;">${client.phone}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Correo:</b> <span style="color: #2c3e50;">${client.email}</span></p>
            </div>
          `,
          showCloseButton: true
        });
      });
  }

  getInfoClient(){
    this.clientService.getClient(this.AllClients)
    .subscribe(response =>{
      console.log(response);
    })
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(Clients => {
      CLIENTS = Clients;
      this.dataSource = new MatTableDataSource(CLIENTS);
    });
  }

  deleteClient(client: Client) {
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
        this.clientService.deleteClient(client);
        Swal.fire(
          '¡Eliminado!',
          'Has eliminado a este coach',
          'success'
        );
      }
    });
  }


}
