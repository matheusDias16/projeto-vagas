import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/model/categorias/categorias';
import { GeralService } from 'src/app/service/geral.service';
import { ActivatedRoute } from '@angular/router';
import { Vagas } from 'src/app/model/vagas/vagas';
import { Empresa } from 'src/app/model/empresa/empresa';
import { subscribeOn } from 'rxjs';
@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  categoria: Categorias = new Categorias()
  idDaUrl: number = 0
  tipoDeBusca: string = ''
  vagas: Vagas[] = []
  empresa: Empresa[] = []
  

  constructor(
    private api: GeralService,
    private rotaAtiva: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])
    this.tipoDeBusca = (this.rotaAtiva.snapshot.params['tipo'])
    this.pegaCategoriaId()
    this.pegaVagaId()
    this.pegaEmpresa()
  }

  pegaVagaId(): void {
    if (this.tipoDeBusca == "categoria") {
      this.api.getVagaPorCategoria(this.idDaUrl).subscribe((vagas) => {
        this.vagas = vagas

      })
    } else if (this.tipoDeBusca == "empresa") {
      this.api.getVagaPorEmpresa(this.idDaUrl).subscribe((vagas) => {
        this.vagas = vagas
      })
    }

  }

  pegaCategoriaId(): void {
    this.api.getCategoriaPorId(this.idDaUrl).subscribe((categorias) => {
      this.categoria = categorias
    })
  }
  pegaEmpresa(): void {
    this.api.getEmpresas().subscribe((empresas) => {
      this.empresa = empresas
    })
  }

  findEmpresa(id: number): string {
    let emp = this.empresa.find((obj) => obj.id == id)
    if (emp) {
      return emp.nome
    } else {
      return ''
    }
  }
  converteHoras(isoData: string): string {
    let data = new Date(isoData)
    // 10/07/2023 10h45
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} `
  }
 
}
