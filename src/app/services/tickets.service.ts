import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, docData, updateDoc, deleteDoc} from '@angular/fire/firestore';
import Ticket from '../interfaces/ticket.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private firestore: Firestore) { }

  addTicket(ticket: Ticket){
    const ticketRef = collection(this.firestore, 'tickets');
    return addDoc(ticketRef, ticket);
  }

  getTickets(): Observable<Ticket[]>{
    const ticketRef = collection(this.firestore, 'tickets');
    return collectionData(ticketRef, {idField: 'id'}) as Observable<Ticket[]>;
  }

  getTicket(ticket: Ticket){
    const ticketRef = doc(this.firestore, 'tickets', `${ticket.id}`);
    return docData(ticketRef);
  }

  updateTicket(ticket: string, form:any){
    const ticketRef = doc(this.firestore, `tickets/${ticket}`);
    return updateDoc(ticketRef, form)
  }

  deleteTicket(ticket: Ticket){
    const ticketRef = doc(this.firestore, `tickets/${ticket.id}`);
    return deleteDoc(ticketRef);
  }

}
