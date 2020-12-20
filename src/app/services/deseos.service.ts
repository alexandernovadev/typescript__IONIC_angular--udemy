import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];
  // Trae el modelos de Lista, esto ya lo habia echo IMPOSIBLE NO ENTIENDA

  constructor() {
    // Este servicio solo se llama una vez en todos los componentes,
    // asi lo inyecte en varios componentes SOLO UNA VEZ SE LLAMA

    this.cargarStorage();

    // *** Esto es para crear dos valores iniciales, como de prueba

    // const lista1 = new Lista('Recolectar Piedras Infinito');
    // const lista2 = new Lista('Heros a desaparecer');

    // this.listas.push(lista1, lista2);
    // console.log(this.listas);
    
    /* El curso esta bueno, muy practico */

  }

  crearLista(titulo: string) {

    // Se llama una instacia de de lista
    const listanew = new Lista(titulo);

    // Se agrega nombre de la Lista, este metodo se llama al dar envia
    // en el formulario alert, envia un string
    this.listas.push(listanew);

    // Guarda en el storage, es como una cookie,
    // MUY INTERESANTE ESTO, MUYYYYYY HP  JAAJJAJA WEEED
    this.guardarStorage();

    // Retornamos el id creado,
    /*  Por cierto estos ID se generan con el tiempo en que
    se crean WOW muy ingenioso y mas porque es para enseñar
    sabe mucho Fernando
     */
    return listanew.id;

   }

   borrarLista(lista: Lista) {

    // Aqui el filtro coje todos los elementos de que sean direntes al idLista
    // Esta servero como lo elimina LA LOGICA SIEMPRE ME IMPRESIONA

    this.listas = this.listas.filter( listaData =>  listaData.id !== lista.id );

    this.guardarStorage();

   }


  guardarStorage() {

    /* Se llama el localStorague propio de un navegador web
    Y se guarda o se pone un elemento String,
    en este caso convirtio la data JSON en un string con
     JSON.stringify(this.listas)
     Y se llama data, que va en el primer parametro*/
    localStorage.setItem('data', JSON.stringify(this.listas) );

  }


  cargarStorage() {

    // Si hay algo en el LocalStorague llamado "Data",
    // Guardelo, paselo a JSON porque esta en String
    // y eso se lo asinga a listas
    if ( localStorage.getItem('data') ) {
      this.listas = JSON.parse( localStorage.getItem('data') );
    } else {
      this.listas = [];
    }

  }

  obtenerLista( id: string | number ) {

    // Reccibo  el id y lo covierto a tipo number
    // para hacer la comparacion ===
    id = Number(id);

    // Utilizo .find la funcion de Javascript pra buscar
    // en los arreglos.

    // La comparacion hace que retorne la lista con el mismo ID
    // Pero OJO QUE PASARIA SI NO HAY ID IGUAL  A ESE  ??????
    return this.listas.find(  listaData => listaData.id === id );

  }
}
