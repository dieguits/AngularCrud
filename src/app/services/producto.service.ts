import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
//import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/observable';
import { Producto } from '../models/producto';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded' //'application/json',
    })
};

@Injectable()
export class ProductoService {
    public url: string;

    constructor(
        public http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    getProductos() {
        //console.log(this.http.get(this.url + 'productos'));
        return this.http.get<any>(this.url + 'productos'); //.subscribe(res => res.json());
    }

    getProducto(id) {
        return this.http.get<any>(this.url+'producto/'+id);
    }

    addProducto(producto: Producto) {

        let json = JSON.stringify(producto);
        console.log("Producto: " + json);
        let params = 'json=' + json;
        //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post<any>(this.url + 'productos', params, httpOptions); //.map(res=>res.json());
    }

    /*makeFileRequest(url: string, params: Array<string>, files: File) {
        return new Promise((resolve, reject)=> {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            //for(var i = 0; i < files.length; i++){
                formData.append('uploads[]', files[0], files[0].name);
            //}

            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            };

            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }*/

    public uploadFile(url: string, data) {

        //let uploadURL = `${this.SERVER_URL}`;

        return this.http.post<any>(url, data, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {

            switch (event.type) {

                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return event.body;

                default:
                    return `Unhandled event: ${event.type}`;
            }
        })
        );
    }
}