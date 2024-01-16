import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-problems-add',
  templateUrl: './problems-add.component.html',
  styleUrls: ['./problems-add.component.css']
})
export class ProblemsAddComponent {

  problem='';

  constructor(private orderService: OrderService){}

  async addProblem(){
    var datos: any;
    datos = {
      'problem': this.problem
    }
    const response = await this.orderService.addProblem(datos);
  }
}
