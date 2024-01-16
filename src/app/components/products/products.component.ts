import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Product from 'src/app/interfaces/products.interface';
import Ticket from 'src/app/interfaces/ticket.interface';
import { ProductService } from 'src/app/services/products.service';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';
import { ProductsAddComponent } from '../products-add/products-add.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductsAddDevicesComponent } from '../products-add-devices/products-add-devices.component';

let PRODUCT: Product[];
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stock','type', 'sold', 'section', 'acciones'];
  dataSource: any;
  closeResult = '';
  coachForm: any;
  idCoach: any;
  AllProducts: any;



  constructor(
    private productServices: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  showCustomDialog() {
    Swal.fire({
      title: 'Tipo de Producto',
      html: '<p>Eliga el tipo de producto</p>',
      showCancelButton: false,
      showConfirmButton: false,
      cancelButtonText: 'Cancel',
      footer: `
          <button id="btn1" class="swal2-styled" style="background-color:rgb(63, 77, 209); color: white">Standard</button>
          <button id="btn2" class="swal2-styled" style="background-color:rgb(63, 77, 209); color: white">Aparato Electrónico</button>
        `,
      didOpen: () => {
        const btn1: any = document.getElementById('btn1');
        const btn2: any = document.getElementById('btn2');

        btn1.addEventListener('click', () => {
          const dialogRef = this.dialog.open(ProductsAddComponent);
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
          Swal.close();
        });

        btn2.addEventListener('click', () => {
          const dialogRef = this.dialog.open(ProductsAddDevicesComponent);
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
          Swal.close();
        });
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  getProduct(product: Product) {
    this.productServices.getProduct(product)
      .subscribe(response => {
        Swal.fire({
          title: 'Información del Producto',
          html: `
            <div style="text-align: left; font-family: Arial, sans-serif;">
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Nombre:</b> <span style="color: #2c3e50;">${product.name}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Marca:</b> <span style="color: #2c3e50;">${product.brand}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Modelo:</b> <span style="color: #2c3e50;">${product.model}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Código de barra:</b> <span style="color: #2c3e50;">${product.code}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Stock:</b> <span style="color: #2c3e50;">${product.stock}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Precio Compra:</b> <span style="color: #2c3e50;">${product.price}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Precio Venta:</b> <span style="color: #2c3e50;">${product.sold}</span></p>
              <p style="color: #4a4a4a; margin-bottom: 10px;"><b>Sección:</b> <span style="color: #2c3e50;">${product.section}</span></p>
            </div>
          `,
          showCloseButton: true
        });
      });
  }

  getInfoProduct() {
    this.productServices.getProduct(this.AllProducts)
      .subscribe(response => {
        console.log(response);
      })
  }

  addForm() {
    const timeRegistered = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    this.coachForm = {
      'name': (<HTMLInputElement>document.getElementById('nameC')).value,
      'phone': (<HTMLInputElement>document.getElementById('phoneC')).value,
      'email': (<HTMLInputElement>document.getElementById('emailC')).value,
      'school': (<HTMLInputElement>document.getElementById('schoolC')).value,
      'shirt': (<HTMLInputElement>document.getElementById('shirtC')).value,
      'dayOne': false,
      'dayTwo': false,
      'participants': [
        {
          'name': 'Sofia',
          'shirt': 'XL',
          'dayOne': false,
          'timeRegistered': ''
        },
        {
          'name': 'Juan Luis',
          'shirt': 'XS',
          'dayOne': false,
          'timeRegistered': ''
        }
      ],
      'timeRegisteredOne': '',
      'timeRegisteredTwo': ''
    }
  }


  registerAsistence(id: string, dayOne: boolean) {
    const timeFinished = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    if (!dayOne) {
      this.productServices.updateProduct(id, { 'timeRegisteredOne': timeFinished, 'dayOne': true })
        .then(response => {
          Swal.fire({
            title: '¡BIEN!',
            text: 'Coach registrado',
            icon: 'success'
          });
        })
        .catch(error => console.log(error));
    }
  }

  registeredSuccess() {
    Swal.fire({
      title: '¡BIEN!',
      text: 'Hemos registrado al Coach',
      icon: 'success'
    });
  }

  ngOnInit(): void {
    this.productServices.getProducts().subscribe(Products => {
      PRODUCT = Products;
      this.dataSource = new MatTableDataSource(PRODUCT);
    });
  }


  deleteProduct(product: Product) {
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
        this.productServices.deleteProduct(product);
        Swal.fire(
          '¡Eliminado!',
          'Has eliminado a este coach',
          'success'
        );
      }
    });
  }


}
