import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  listProduct: Product[] = [
    {
      ProductoId: 1,
      Descripcion: 'Laptop',
      Marca: 'Lenovo',
      Precio: 15450,
      Stock:15
    },
    {
      ProductoId: 2,
      Descripcion: 'Teclado',
      Marca: 'Logitech',
      Precio: 780,
      Stock: 23
    },
    {
      ProductoId: 3,
      Descripcion: 'Mouse',
      Marca: 'Hp',
      Precio: 850,
      Stock:10
    }
  ]
}
