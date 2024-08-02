import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  formProducto: FormGroup;

  constructor(private fb: FormBuilder){
    this.formProducto = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(20)]
      ],
      marca: ['', Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required]
    })
  }

  addProduct(){
    // console.log(this.formProducto);
    console.log(this.formProducto.value.descripcion);
    console.log(this.formProducto.get('descripcion')?.value);
    const producto: Product = {
      descripcion: this.formProducto.value.descripcion,
      marca: this.formProducto.value.marca,
      precio: this.formProducto.value.precio,
      stock: this.formProducto.value.stock
    }
    console.log(producto);
  }
}
