export class Producto{

    constructor(
        public producto_id: number,
        public nombre: string,
        public description: string,
        public precio: number,
        public imagen: string
    ){}
}