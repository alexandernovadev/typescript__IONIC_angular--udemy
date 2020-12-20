import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { AlertController, IonItemSliding, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() completada = false;

  // Esto es para cerrar el sliding
  // Lo que esta dentro de viewChild, esta diciento busque todos los elementos
  // Ionlist del HTML, como solo hay uno solo coje el que hay,
  // Pero si hubieran artos seria un arreglo de ionlist
  // Yo digo que es mejor colocar un selector #ionlista se coloca entre comillas
  @ViewChild( IonList ) lista: IonList;

  constructor(private router: Router,
              public deseoservice: DeseosService,
              public alertCtroledit: AlertController) { }

  ngOnInit() {}

  listaSelecionada(lista: Lista) {
    // console.log(lista);

    // Hubo que crear una lista o path que hiciera la navegacion de tab2 
    // revisar tabroutermodule

    if ( this.completada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }

  }

  async editarLista(lista: Lista) {
  // this.deseoservice.listas.

  const alert = await this.alertCtroledit.create({
      header: 'Editar lista',
      cssClass: 'alertCustomCss',
      inputs: [
        {
          name: 'titulo',
          value: lista.titulo,
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          // El handler vota lo que esta en el input, el valor.
          handler: ( data ) => {
          //   console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            }

            lista.titulo = data.titulo;
            // Cambia El titulo aqui de las lista proveniente
            this.deseoservice.guardarStorage();

            // Con el viewChild ya trae los metodos por defecto
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    // Present  que hara ? retorna el valor de la promesa ??
    // o continua con present si es seguro ??

    // presente es crea esta alerta , en javaAndroid hay una parecida
    await alert.present();
  }

  borrarLista(lista: Lista) {

    this.deseoservice.borrarLista(lista);
    
  }
}
