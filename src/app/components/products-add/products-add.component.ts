import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent {

  name='';
  code='';
  description='';
  stock='';
  price='';
  sold='';
  section='';
  provider='';
  warranty='Ninguna';
  created= new Date();

  constructor(private productService: ProductService){}

  async addProduct(){
    var datos: any;
    datos = {
      'name': this.name,
      'code': this.code,
      'description': this.description,
      'stock': this.stock,
      'price': this.price,
      'sold': this.sold,
      'section': this.section,
      'type': 'Accesorio',
      'provider': this.provider,
      'brand': '',
      'model': '',
      'image': '',
      'warranty': this.warranty,
      'createdAt': this.created.toLocaleDateString()
    }
    const response = await this.productService.addProduct(datos);
  }
}
