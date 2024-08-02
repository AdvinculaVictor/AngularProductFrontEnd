import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  formProducto: FormGroup;
  loading: boolean=false;
  id: number;
  operacion: string='Agregar ';

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ){
    this.formProducto = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(20)]
      ],
      marca: ['', Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.id != 0){
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number){
    this.loading = true;
    this._productService.getProduct(id).subscribe((data:Product) => {
      this.loading=false;
      this.formProducto.setValue({
        descripcion: data.descripcion,
        marca: data.marca,
        precio: data.precio,
        stock: data.stock
      })
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
    this.loading = true;
    if(this.id!=0){
      //Editar
      producto.productoId = this.id;
      this._productService.updateProduct(this.id, producto).subscribe(() =>{
        this.toastr.info(`El producto ${producto.descripcion} se actualizó correctamente`,'Producto Actualizado');   
        this.loading=false;
        this.router.navigate(['/']);
      })
    }else{
      //Agregar
      this._productService.saveProduct(producto).subscribe(()=>{
        this.loading=false;
        this.toastr.success(`El producto ${producto.descripcion} se agregó correctamente`,'Producto Agregado');
        this.loading=false;
        this.router.navigate(['/']);
      })      
    }


  }
}
