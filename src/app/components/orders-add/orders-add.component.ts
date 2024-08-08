import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Client from 'src/app/interfaces/clients.interface';
import Services from 'src/app/interfaces/services.interface';
import { ClientService } from 'src/app/services/clients.service';
import { OrderService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/products.service';
import { ClientsAddComponent } from '../clients-add/clients-add.component';
import { ProblemsAddComponent } from '../problems-add/problems-add.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ServicesService } from 'src/app/services/services.service';
let CLIENTES: Services[];

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.css']
})
export class OrdersAddComponent implements OnInit{

  client='';
  device='';
  dueDate:any;
  dueTime='';
  problem='';
  price='';
  password='';
  idCliente='';
  date= new Date();
  products= [];
  clients:any=[];
  myControl = new FormControl('');
  options: any[]=[];
  filteredOptions?: Observable<string[]>;
  //Problemas
  optionsProblem: string[]=[];
  myControlProblem = new FormControl('');


  constructor(private orderService: OrderService, private clientService: ClientService, public dialog: MatDialog,private servicesService: ServicesService ){
  }

  ngOnInit() {
    this.servicesService.getServices().subscribe(response=>{
      CLIENTES= response;
      this.options=CLIENTES.map(cliente => cliente.name);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });

    this.orderService.getProblems().subscribe(response=>{
      this.optionsProblem= response.map(problem => problem.name);
      console.log(this.optionsProblem)

    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  openDialog() {
    const dialogRef = this.dialog.open(ClientsAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openClientDevice() {
    const dialogRef = this.dialog.open(ClientsAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogProblema() {
    const dialogRef = this.dialog.open(ProblemsAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayFn(user: Client): string {
    return user && user.name ? user.name : '';
  }

  async addProduct(){
    var datos: any;
    datos = {
      'client': this.client,
      'device': this.device,
      'dueDate': this.dueDate.toLocaleDateString(),
      'dueTime': this.dueTime,
      'employee': this.problem,
      'password': this.password,
      'price': this.price,
      'createdAt': this.date.toLocaleDateString()
    }
    const response = await this.orderService.addOrder(datos);
  }
}
