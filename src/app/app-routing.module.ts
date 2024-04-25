import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { BuscaComponent } from './component/busca/busca.component';
import { InternaComponent } from './component/interna/interna.component';
import { LoginComponent } from './component/login/login.component';
import { CreateComponent } from './component/crud/create/create.component';
import { CreateCategoriasComponent } from './component/crud/create-categorias/create-categorias.component';
import { CreateEmpresaComponent } from './component/crud/create-empresa/create-empresa.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'busca/:tipo/:id', component: BuscaComponent },
  { path: 'interna/:id', component: InternaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crud', component: CreateComponent },
  { path: 'crud/categoria', component: CreateCategoriasComponent },
  { path: 'crud/empresa', component: CreateEmpresaComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
