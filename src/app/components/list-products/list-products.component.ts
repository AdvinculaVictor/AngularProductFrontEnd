import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  listProduct: Product[] = [];
  loading: boolean = false;

  constructor(private _productService: ProductService, private toastr: ToastrService){

  }

  ngOnInit(){
    this.getListProducts();
  }
  getListProducts(){
    this.loading = true;
    //setTimeout(() => { //Corriendo dentro de un settimeout para probar el progress bar
      this._productService.getListProducts().subscribe((data: Product[]) => {
        this.listProduct = data;
        console.log(this.listProduct);
        this.loading = false;
      })
    //}, 1500) //settimeout 1.5 s
  }

  deleteProduct(id:number){
    this.loading=true;
    this._productService.deleteProduct(id).subscribe(()=>{
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con éxito','Producto Eliminado');
    })
  }
}
