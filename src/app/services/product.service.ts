import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Observable<Product[]>;
  public pos = 0;
  public productwhere: Product = {
    id: "",
    name: "",
    price: 0,
    description: "",
    type: "",
    photo: ""
  };
  public productCollection: AngularFirestoreCollection<Product>;

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

  //Actualizar
  updateProduct(product:Product):Promise<string>{
    return this.productCollection.doc(product.id).update(product)
    .then((doc)=>{
      console.log('Producto actualizado con id'+ product.id);

      return 'success'
    })
    .catch((error)=>{
      console.log('Error al actualizar producto'+ error);
      return 'Error'
    });
  }

  //Eliminar 
  deleteProduct(product:Product):Promise<string>{
    return this.productCollection.doc(product.id).delete()
    .then((doc)=>{
      console.log('Producto eliminado con id'+ product.id);
      return 'success'
    })
    .catch((error)=>{
      console.log('Error al eliminar producto'+ error);
      return 'Error'
    });
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }
}
