import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
    selector: 'productos-list',
    templateUrl: '../view/productos-list.html',
    providers: [ProductoService]
})
export class ProductosListComponent {
    public titulo:string;
    public productos: Producto[];
    private resultrpt = {"status":'', "code": 0, "data": ''};
    private error: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productoService: ProductoService
    ){
        this.titulo = 'Listado de productos';
    }

    ngOnInit(){
        console.log("Se cargo el component de lista de productos");

        this.productoService.getProductos().subscribe(
            
            (res) => this.resultrpt = res,
            (err) => this.error = err

            /*result => {
                
                if(result.code != 200){
                    console.log(result);
                }else {
                    this.productos = result.data;
                }
            },
            error => {
                console.log(<any>error);
            }*/
        );

        //if(this.resultrpt.code == '200')
        //console.log("No se que pasa: " + this.resultrpt.status + " - " + this.error);
    }
}