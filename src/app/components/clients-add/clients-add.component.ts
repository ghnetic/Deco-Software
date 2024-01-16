import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.css']
})
export class ClientsAddComponent {

  name='';
  phone='';
  email='';

  constructor(private clientService: ClientService){}

  async addClient(){
    var datos: any;
    datos = {
      'name': this.name,
      'phone': this.phone,
      'email': this.email,
    }
    const response = await this.clientService.addClient(datos);
  }
}
