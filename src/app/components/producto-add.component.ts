import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'producto-add',
    templateUrl: '../view/producto-add.html',
    providers: [ProductoService]
})
export class ProductoAddComponent implements OnInit {
    public titulo: string;
    public producto: Producto;

    formProducto: FormGroup;
    error: string;
    uploadResponse = { status: 'nada', message: '', filePath: '' };
    resultrpt = {status: '', code: 0, data: ''};
    rpt = {status: '', code: 0, message: ''};

    public filesToUpload;
    public resultUpload;

    constructor(
        private productoService: ProductoService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.titulo = "Crear un nuevo producto";
        this.producto = new Producto(0, '', '', 0, '');
    }

    ngOnInit() {
        this.formProducto = this.formBuilder.group({
            pick: ['']
        });

        console.log("Producto-add component cargado!!!");
    }

    onSubmit() {
        //console.log(this.producto);
        //console.log(this.filesToUpload.length);
        

        this.filesToUpload = new FormData();
        this.filesToUpload.append('uploads', this.formProducto.get('pick').value);
        //this.filesToUpload.append('uploads', this.filesToUpload.value);
        //if (this.filesToUpload)
        
        if (this.filesToUpload) {
            console.log("Vientos y mareas alcalinas!!! " + this.formProducto.get('pick').value);
            //this.productoService.makeFileRequest(GLOBAL.url + 'upload-file', [], this.filesToUpload).then((result) => {
            this.productoService.uploadFile(GLOBAL.url + 'upload-file', this.filesToUpload).subscribe(
                (res) => {
                    this.uploadResponse = res;
                    if(res.status == "success") {
                        this.producto.imagen = res.filename;
                        this.saveProducto();
                    }
                },
                (err) => this.error = err
            );

                
                /*console.log('RESULTADO:' + result);

                this.resultUpload = result;
                this.producto.imagen = this.resultUpload.filename;

                this.saveProducto();

            }, (error) => {
                console.log('ERROR:' + error);
            });*/

        } else {
            this.saveProducto();
        }
    }

    /**
     * @description Metodo para hacer el guardado del producto solo en la base de datos con los datos.
     * @author Diego.Perez.
     */
    saveProducto() {
        console.log(this.producto.imagen);
        this.productoService.addProducto(this.producto).subscribe(
            (result) => {
                this.rpt = result
                if(this.rpt.code == 200 && this.rpt.status == "success") {
                    this.router.navigate(['/productos']);
                }
            },
            (err) => this.error = err
            /*(result) => {
                if (result.code == 200) {
                    console.log(result);
                    this.router.navigate(['/productos']);
                } else {
                    console.log(result);
                }
            },
            error => {
                console.log(<any>error);
            }*/
        );
    }

    /*fileChangeEvent(fileInput: any) {

        this.filesToUpload = fileInput.target.files[0];
        console.log(this.filesToUpload);
    }*/

    /**
     * @description Metodo para obtener valores del upload file.
     * @param event File que se obtiene del control file.
     * @author Diego.Perez.
     */
    onFileChange(event: any) {

        if (event.target.files.length > 0) {
            //console.log("Esta es la vuelta: " + event.target.files.length);
            this.filesToUpload = <Array<File>>event.target.files[0];
            //this.producto.imagen = "" + <Array<File>>event.target.files[0].name;
            console.log(this.filesToUpload.name);
            this.formProducto.get('pick').setValue(this.filesToUpload);
        }
    }
}