import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { BuscaComponent } from './component/busca/busca.component';
import { InternaComponent } from './component/interna/interna.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatRadioModule} from '@angular/material/radio';
import { LoginComponent } from './component/login/login.component';
import { CreateComponent } from './component/crud/create/create.component';
import { CreateCategoriasComponent } from './component/crud/create-categorias/create-categorias.component';
import { CreateEmpresaComponent } from './component/crud/create-empresa/create-empresa.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscaComponent,
    InternaComponent,
    LoginComponent,
    CreateComponent,
    CreateCategoriasComponent,
    CreateEmpresaComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
