import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;

  //Para traer el valor de INput 
  nombreItem = '';

  constructor(private desosserice: DeseosService,
                private veridurl:ActivatedRoute) {

      const listaId = this.veridurl.snapshot.paramMap.get('listaId');
      this.lista = this.desosserice.obtenerLista( listaId );

      console.log(this.lista);
      

      // Primero que todo Buenas
      // jajaja hay que suscribirse y sacar el id con funcion de flecha
      // pero con la linea de arriba me evito todo eso
      // y traigo el valor de una vez snapshot.paramMap.get('id');

      // OJO el parametro es como esta el id en el path de ionic tab
      // buscque como ests en el router de tabs
   }


   agregarItem(){


    if (this.nombreItem.length === 0) {
      // TODO: Error se pued hacer validacion
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);

    this.lista.item.push(nuevoItem);
    // Agrega un nuevo elemto al arreglo que tiene.

    this.desosserice.guardarStorage();
    // El servicio esta inicializado aqui, por lo que listas se cambia el valor
    // con lo que se le agregue aqui WOW IMPRESIONANTE
    this.nombreItem = '';

   }
  ngOnInit() {
  }

  cambioCheck(item: ListaItem) {
    console.log(item);

    /*Esa const me trae como un for, recorre todos los elemetos y trae el largo de la consutla
    eso me da un numero */
    const pendientes = this.lista.item
                          .filter(resultado => !resultado.completado )
                          .length;

    /* Viene un TRUCASO
      imprimir en console log como un TAG y resultado: como JAVAAndroid

      console.log({pendientes})

      Me imprimer algo como :    pendientes: 4
      WOWWWWWWWW
    */

    /* Con este if verifico que todos estan en true osea hechas las tareas */
    if (pendientes  === 0) {
      this.lista.terminaEn = new Date();
      this.lista.completada = true;
    } else {
      this.lista.terminaEn = null;
      this.lista.completada = false;
    }
    // Guarda porque hay ngmodel o puente que cambia el estado del la lista
    // directamente con ngmodel WOW
    this.desosserice.guardarStorage();

    console.log(this.desosserice.listas);
    
  }
  borrar( i: number ) {

    // Quite desde el elemento i un elemento
    // osea queteme el elemnto selccionada
    this.lista.item.splice( i, 1 );

    this.desosserice.guardarStorage();

  }
  

}
