import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


// Aca sirve para cambiar las rutas, pero esto cambia a una nueva pagina

// Si quiero que navegue dentro de las tabas, tengo que crear un path dentro 
// del Router de tabs, si, tabs tiene otro Routing
const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
