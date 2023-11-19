import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage {

  public productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private toastController: ToastController, private router: Router) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      photo: [''],
      type: ['', Validators.required]
    });
  }

  async saveProduct() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.productService.saveProduct(product)
      .then(
        async(result)=>{
          if(result=='success'){
            const toast = await this.toastController.create({
              message: 'Producto guardado correctamente',
              duration: 2000, // Duración de 2 segundos
              position: 'top' // Posición superior
            });
            toast.present();
          }
          else{
            const toast = await this.toastController.create({
              message: 'Error al guardar producto',
              duration: 2000, // Duración de 2 segundos
              position: 'top' // Posición superior
            });
            toast.present();
          }
        }
      )
      .catch(
        async(error)=>{
          const toast = await this.toastController.create({
            message: 'Error al guardar producto',
            duration: 2000, // Duración de 2 segundos
            position: 'top' // Posición superior
          });
          toast.present();
        }
      )
    } else {
      console.warn('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }

    const toast = await this.toastController.create({
      message: 'Producto guardado correctamente',
      duration: 2000, // Duración de 2 segundos
      position: 'top' // Posición superior
    });
    toast.present();

    // Redirigir a la pestaña tab1
    this.router.navigate(['/tabs/tab1']);
  }

}
