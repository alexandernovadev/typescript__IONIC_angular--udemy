import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Esta carpeta de CommonMudule: Ngif ngFor Ngswith...... todo eso

import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ListasComponent
  ],
  exports: [
    ListasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule // Pasar el Pipe donde yo quiera
  ]
})
export class ComponentsModule { }
