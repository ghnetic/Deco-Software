import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, docData, updateDoc, deleteDoc} from '@angular/fire/firestore';
import Client from '../interfaces/clients.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: Firestore) { }

  addClient(client: Client){
    const clientRef = collection(this.firestore, 'clients');
    return addDoc(clientRef, client);
  }

  getClients(): Observable<Client[]>{
    const clientRef = collection(this.firestore, 'clients');
    return collectionData(clientRef, {idField: 'id'}) as Observable<Client[]>;
  }

  getClient(client: Client){
    const clientRef = doc(this.firestore, 'clients', `${client.id}`);
    return docData(clientRef);
  }

  updateClient(client: string, form:any){
    const clientRef = doc(this.firestore, `clients/${client}`);
    return updateDoc(clientRef, form)
  }


  deleteClient(client: Client){
    const clientRef = doc(this.firestore, `clients/${client.id}`);
    return deleteDoc(clientRef);
  }

}
