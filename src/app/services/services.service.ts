import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, docData, updateDoc, deleteDoc} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import Product from '../interfaces/products.interface';
import Service from '../interfaces/services.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: Firestore) { }

  addService(service: Service){
    const serviceRef = collection(this.firestore, 'services');
    return addDoc(serviceRef, service);
  }

  getServices(): Observable<Service[]>{
    const serviceRef = collection(this.firestore, 'services');
    return collectionData(serviceRef, {idField: 'id'}) as Observable<Service[]>;
  }

  getService(service: Service){
    const serviceRef = doc(this.firestore, 'services', `${service.id}`);
    return docData(serviceRef);
  }

  updateService(id: string, form:any){
    const serviceRef = doc(this.firestore, `services/${id}`);
    return updateDoc(serviceRef, form)
  }

  deleteServices(service: Service){
    const serviceRef = doc(this.firestore, `services/${service.id}`);
    return deleteDoc(serviceRef);
  }


}
