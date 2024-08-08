import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Order from 'src/app/interfaces/orders.interface';
import Ticket from 'src/app/interfaces/ticket.interface';
import { OrderService } from 'src/app/services/orders.service';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';
import { ProductsAddComponent } from '../products-add/products-add.component';
import { OrdersAddComponent } from '../orders-add/orders-add.component';


let ORRDERS: Order[];
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'timeRegisteredOne', 'dayOne','participants', 'acciones'];
  dataSource: any;
  closeResult = '';
  coachForm: any;
  idCoach: any;
  AllOrders: any;



  constructor(
    private orderService: OrderService,
    private router: Router,
    public dialog: MatDialog
    ){}



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  getOrder(order: Order) {
    this.orderService.getOrder(order)
      .subscribe(response => {
        Swal.fire(
          'Información de la orden',
        );
      });
  }

  getInfoTicket(){
    this.orderService.getOrder(this.AllOrders)
    .subscribe(response =>{
      console.log(response);
    })
  }


  openDialog() {
    const dialogRef = this.dialog.open(OrdersAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  ngOnInit(): void {
    this.orderService.getOrders().subscribe(Orders => {
      ORRDERS = Orders;
      this.dataSource = new MatTableDataSource(ORRDERS);
    });
  }

  deleteOrder(order: Order) {
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
        this.orderService.deleteOrder(order);
        Swal.fire(
          '¡Eliminado!',
          'Has eliminado a este coach',
          'success'
        );
      }
    });
  }


}
