import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Registro } from './pages/registro/registro';
import { Contactar } from '../landing/pages/contactar/contactar';

const routes: Routes = [
  {
    path: 'registro',
    component: Registro
  },
  { path: '/contactar', component: Contactar}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
