import { ListaItem } from './lista-item.model';

export class Lista {

    id: number;
    titulo: string;
    creadaEn: Date;
    terminaEn: Date;
    completada: boolean;
    item: ListaItem[];

    constructor(titulo: string) {
        this.titulo = titulo;

        this.creadaEn = new Date(); // Crea una fecha, la fecha actual
        this.completada = false; // Porque no puede estar terminada cuando se crea
        this.item = []; // Un arreglo vacio de elementos

        this.id = new Date().getTime(); // Crea un id con los milisegundos ???
    }
}