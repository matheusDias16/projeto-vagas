import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/model/categorias/categorias';
import { Empresa } from 'src/app/model/empresa/empresa';
import { GeralService } from 'src/app/service/geral.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
categoria : Categorias[] = []
empresa : Empresa[] = []

  constructor(
  private api:GeralService
){}
ngOnInit(): void {
  this.pegaCategorias()
  this.pegaEmpresas()
}

  pegaCategorias(): void{
    this.api.getCategorias().subscribe( (categorias) => {
      this.categoria = categorias
    })
  }
  pegaEmpresas(): void{
    this.api.getEmpresas().subscribe( (empresas) => {
      this.empresa = empresas
    })
  }
}
