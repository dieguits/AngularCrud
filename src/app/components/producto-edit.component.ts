import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
    selector: 'producto-edit',
    templateUrl: '../view/producto-add.html',
    providers: [ProductoService]
})
export class ProductoEditComponent {
    public titulo: string;
    public producto: Producto;

    public filesToUpload;
    public resultUpload;
    public is_edit;

    error: string;
    result = { status: '', code: 0, data: '' };

    constructor(
        private productoService: ProductoService,
        private route: ActivatedRoute,
        private router: Router
    ){
        this.titulo = "Editar Producto";
        this.producto = new Producto(0, '', '', 0, '');
        this.is_edit = true;
    }

    ngOnInit(){
        console.log(this.titulo);
        this.getProducto();
    }

    getProducto() {
        this.route.params.forEach((params: Params) => {
            let id = params['producto_id'];

            this.productoService.getProducto(id).subscribe(
                (res) => {
                    this.result = res;
                    if (this.result.code == 200) {
                        this.producto = res.data;
                    } else {
                        this.router.navigate(['/productos']);
                    }
                },
                (err) => this.error = err
            )
        });
    }

    editProducto(id, producto: Producto) {

    }
}
