import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';
import { Carrito } from './pages/carrito/carrito';

const routes: Routes = [
  { path: '', component: Catalogo },
  { path: 'carrito', component: Carrito}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
