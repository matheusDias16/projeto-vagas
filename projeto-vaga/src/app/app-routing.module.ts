import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { BuscaComponent } from './component/busca/busca.component';
import { InternaComponent } from './component/interna/interna.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'busca/:tipo/:id', component: BuscaComponent },
  { path: 'interna/:id', component: InternaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
