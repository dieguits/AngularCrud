import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';


@Component({
    selector: 'producto-detail',
    templateUrl: '../view/producto-detail.html',
    providers: [ProductoService]
})
export class ProductoDetailComponent {
    public tittle: string = "Detalle del producto";
    public producto: Producto;
    error: string;
    result = { status: '', code: 0, data: '' };

    constructor(
        private productoService: ProductoService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        console.log("Producto detail cargado correctamente.");
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
}