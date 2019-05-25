import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: '../view/home.html'
})
export class HomeComponent {
    public titulo:string;

    constructor(){
        this.titulo = 'WebApp de productos con Angular 7';
    }

    ngOnInit(){
        console.log('Se ha cargado el componente home.component.ts');
    }
}