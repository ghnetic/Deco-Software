import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-services-add',
  templateUrl: './services-add.component.html',
  styleUrls: ['./services-add.component.css']
})
export class ServicesAddComponent {

  name='';
  type='';
  device='';
  code='';
  description='';
  price='';
  created = new Date();

  constructor(private servicesService: ServicesService){}

  async addService(){
    var datos: any;
    datos = {
      'name': this.name,
      'type': this.type,
      'device': this.device,
      'code': this.code,
      'description': this.description,
      'price': this.price,
      'createdAt': this.created.toLocaleDateString()
    }
    const response = await this.servicesService.addService(datos);
  }
}
