import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, docData, updateDoc, deleteDoc} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import Product from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }

  addProduct(product: Product){
    const productRef = collection(this.firestore, 'products');
    return addDoc(productRef, product);
  }

  getProducts(): Observable<Product[]>{
    const productRef = collection(this.firestore, 'products');
    return collectionData(productRef, {idField: 'id'}) as Observable<Product[]>;
  }

  getProduct(product: Product){
    const productRef = doc(this.firestore, 'products', `${product.id}`);
    return docData(productRef);
  }

  updateProduct(product: string, form:any){
    const prouctRef = doc(this.firestore, `products/${product}`);
    return updateDoc(prouctRef, form)
  }


  deleteProduct(product: Product){
    const productRef = doc(this.firestore, `products/${product.id}`);
    return deleteDoc(productRef);
  }

  addBrand(brand: any){
    const brandRef = collection(this.firestore, 'brands');
    return addDoc(brandRef, brand);
  }

  addModel(model: any){
    const modelRef = collection(this.firestore, 'models');
    return addDoc(modelRef, model);
  }
  

}
