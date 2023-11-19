import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Observable<Product[]>;

  private productCollection: AngularFirestoreCollection<Product>;

  constructor(private firestore: AngularFirestore) {
    this.productCollection = this.firestore.collection<Product>('products');
    this.products = this.productCollection.valueChanges();
  }

  saveProduct(product: Product): Promise<string> {
    return this.productCollection.add(product)
    .then(
      (doc)=>{
        console.log("Producto añadido con id"+doc.id);
        return "success";
      }
    )
    .catch(
      (error)=>{
        console.log("Error al añadir producto"+error);
        return "error";
      }
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }
}
