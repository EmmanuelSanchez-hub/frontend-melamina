import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Registro } from '../public/pages/registro/registro';

const routes: Routes = [
  { path: '', component: Landing },
  { path: '/registro-publico', component: Registro}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
