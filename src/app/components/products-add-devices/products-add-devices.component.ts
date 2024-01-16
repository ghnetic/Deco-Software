import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-add-devices',
  templateUrl: './products-add-devices.component.html',
  styleUrls: ['./products-add-devices.component.css']
})
export class ProductsAddDevicesComponent {

  name='';
  code='';
  description='';
  stock='';
  price='';
  sold='';
  section='';
  device='';
  brand='';
  model='';
  password='';
  warranty='Ninguna';
  currentDate = new Date();

  constructor(private productService: ProductService){}

  async addProduct(){
    var datos: any;
    datos = {
      'device': this.device,
      'brand': this.brand,
      'model': this.model,
      'name': this.name,
      'code': this.code,
      'description': this.description,
      'stock': this.stock,
      'price': this.price,
      'sold': this.sold,
      'password': this.password,
      'section': this.section,
      'type': 'Dispositivo',
      'image': '',
      'warranty': this.warranty,
      'createdAt': this.currentDate.toLocaleDateString()
    }
    const response = await this.productService.addProduct(datos);
  }
}
