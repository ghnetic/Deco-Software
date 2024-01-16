import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, docData, updateDoc, deleteDoc} from '@angular/fire/firestore';
import Ticket from '../interfaces/ticket.interface';
import { Observable } from 'rxjs';
import Order from '../interfaces/orders.interface';
import Problems from '../interfaces/problems.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: Firestore) { }

  addOrder(order: Order){
    const orderRef = collection(this.firestore, 'orders');
    return addDoc(orderRef, order);
  }

  getOrders(): Observable<Order[]>{
    const orderRef = collection(this.firestore, 'orders');
    return collectionData(orderRef, {idField: 'id'}) as Observable<Order[]>;
  }

  getOrder(order: Order){
    const orderRef = doc(this.firestore, 'orders', `${order.id}`);
    return docData(orderRef);
  }

  updateOrder(order: string, form:any){
    const orderRef = doc(this.firestore, `orders/${order}`);
    return updateDoc(orderRef, form)
  }

  deleteOrder(order: Order){
    const orderRef = doc(this.firestore, `orders/${order.id}`);
    return deleteDoc(orderRef);
  }

  addProblem(problem: Problems){
    const problemRef = collection(this.firestore, 'problems');
    return addDoc(problemRef, problem);
  }

  getProblems(): Observable<Problems[]>{
    const problemRef = collection(this.firestore, 'problems');
    return collectionData(problemRef, {idField: 'id'}) as Observable<Problems[]>;
  }

}
