import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista [] = [];
  constructor (
    public servio: DeseosService,
    private router: Router,
    public alertCtrl: AlertController) {

    this.listas = this.servio.listas;

  }

  async agregarLista(){
    //Esta ruta esta ubicada en tab.rauting
    //this.router.navigateByUrl('/tabs/tab1/agregar');

    /* Esa const alert crea un modal como el de Boostrap,
    si no  que en vez de html creamos JSON

    await : Espera a que la data se pinte, primero se asegura
    con una promesa de que los datos los ve el usuario.

    Por ese motivo se ve como mas seguro a la hora de enviar
    parametros al servcio
     */
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      cssClass: 'alertCustomCss',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: ' Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          // El handler vota lo que esta en el input, el valor.
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            }

            const listaId = this.servio.crearLista( data.titulo );

            // Tengo que crear la lista
            this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
          }
        }
      ]
    });

    // Present  que hara ? retorna el valor de la promesa ??
    // o continua con present si es seguro ??

    // presente es crea esta alerta , en javaAndroid hay una parecida
    await alert.present();
  }

}
