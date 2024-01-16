import { Component, OnInit } from '@angular/core';
import Service from 'src/app/interfaces/services.interface';
import { ServicesService } from 'src/app/services/services.service';
import { ServicesAddComponent } from '../services-add/services-add.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Client from 'src/app/interfaces/clients.interface';
import Swal from 'sweetalert2';

let SERVICES: Service[];
@Component({
  selector: 'app-servicess',
  templateUrl: './servicess.component.html',
  styleUrls: ['./servicess.component.css']
})
export class ServicessComponent implements OnInit {

  displayedColumns: string[] = ['type', 'device', 'code', 'price', 'acciones'];
  dataSource: any;
  closeResult = '';
  coachForm: any;
  idCoach: any;
  AllServices: any;



  constructor(
    private serviceService: ServicesService,
    private router: Router,
    public dialog: MatDialog
    ){}

    openDialog() {
      const dialogRef = this.dialog.open(ServicesAddComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  getService(service: Service) {
    this.serviceService.getService(service)
      .subscribe(response => {
        Swal.fire({
          title: 'Información del Servicio',
          html: `
            <div style="text-align: left; font-family: Arial, sans-serif;">
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Tipo:</b> <span style="color: #2c3e50;">${service.type}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Precio:</b> <span style="color: #2c3e50;">${service.price}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Dispositivo:</b> <span style="color: #2c3e50;">${service.device}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Código:</b> <span style="color: #2c3e50;">${service.code}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Descripción:</b> <span style="color: #2c3e50;">${service.description}</span></p>
            </div>
          `,
          showCloseButton: true
        });
      });
  }

  getInfoClient(){
    this.serviceService.getService(this.AllServices)
    .subscribe(response =>{
      console.log(response);
    })
  }

  registerAsistence(id:string, dayOne:boolean){
    const timeFinished= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    if(!dayOne){
      this.serviceService.updateService(id,{'timeRegisteredOne': timeFinished, 'dayOne': true })
      .then(response=>{
        Swal.fire({
          title: '¡BIEN!',
          text: 'Coach registrado',
          icon: 'success'
        });
      })
      .catch(error=> console.log(error));
    }
  }

  ngOnInit(): void {
    this.serviceService.getServices().subscribe(Services => {
      SERVICES = Services;
      this.dataSource = new MatTableDataSource(SERVICES);
    });
  }

  deleteService(service: Service) {
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
        this.serviceService.deleteServices(service);
        Swal.fire(
          '¡Eliminado!',
          'Has eliminado a este servicio',
          'success'
        );
      }
    });
  }


}
