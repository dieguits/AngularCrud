import { Component } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: '../view/error.html'
})
export class ErrorComponent {
    public titulo:string;

    constructor() {
        this.titulo = 'Error!! pagina no encontrada';
    }

    ngOnInit(){
        console.log('Error pagina no encontrada');
    }
}