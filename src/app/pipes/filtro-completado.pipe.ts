import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false // Le dice que haga el filtro a fuerza donde este la data y 
  // y el pipe, Actualiza cuando cambia la data
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean = true): Lista[] {

    //Usar filter para buscar todos los que estan completados
    
    return listas.filter( listas => listas.completada  === completada); 
  }

}
