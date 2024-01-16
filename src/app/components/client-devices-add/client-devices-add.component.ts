import { Component } from '@angular/core';
import ClientDevices from 'src/app/interfaces/client-devices.interface';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-devices-add',
  templateUrl: './client-devices-add.component.html',
  styleUrls: ['./client-devices-add.component.css']
})
export class ClientDevicesAddComponent {

  name = '';
  brand = '';
  type = '';
  description = '';
  created = new Date();

  constructor(private clientService: ClientService) { }

  async addClientDevice() {
    var id='';
    var datos: ClientDevices;
    datos = {
      'name': this.name,
      'brand': this.brand,
      'type': this.type,
      'description': this.description,
      'createdAt': this.created.toLocaleDateString()
    }
    this.clientService.updateClient(id, { 'devices': datos })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }
}
